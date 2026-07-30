"""AI inference service."""

import time
import torch
import torch.nn.functional as F

from app.config import settings
from app.core.model_loader import model_manager
from app.services.image_processor import image_processor


class PredictorService:
    """Handles model inference and result formatting."""
    
    def __init__(self):
        self.model_manager = model_manager
        self.image_processor = image_processor
    
    def predict(self, image_bytes: bytes, filename: str) -> dict:
        """
        Run full prediction pipeline.
        Returns structured prediction result.
        """
        start_time = time.perf_counter()
        
        # Validate
        is_valid, error_msg = self.image_processor.validate(filename, image_bytes)
        if not is_valid:
            raise ValueError(error_msg)
        
        # Preprocess
        tensor = self.image_processor.preprocess(image_bytes)
        tensor = tensor.to(self.model_manager.device)
        
        # Inference
        with torch.no_grad():
            outputs = self.model_manager.model(tensor)
            probabilities = F.softmax(outputs, dim=1)
            confidence, predicted_idx = torch.max(probabilities, dim=1)
        
        confidence_val = confidence.item() * 100
        predicted_idx = predicted_idx.item()
        
        # Parse class name
        class_name = self.model_manager.classes[predicted_idx] if predicted_idx < len(self.model_manager.classes) else "Unknown"
        plant, disease = self._parse_class_name(class_name)
        
        processing_time = (time.perf_counter() - start_time) * 1000
        
        return {
            "prediction": class_name,
            "plant": plant,
            "disease": disease,
            "confidence": round(confidence_val, 2),
            "processing_time_ms": round(processing_time, 2),
            "model_version": settings.MODEL_VERSION,
        }
    
    def _parse_class_name(self, class_name: str) -> tuple[str, str]:
        """Parse 'Plant___Disease' format into (plant, disease)."""
        if "___" in class_name:
            parts = class_name.split("___", 1)
            return parts[0].replace("_", " "), parts[1].replace("_", " ")
        return "Unknown", class_name.replace("_", " ")


# Singleton
predictor = PredictorService()