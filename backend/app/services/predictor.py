"""AI inference using the trained model wrapper."""

import time

from app.config import settings
from app.core.model_loader import model_manager
from app.core.logger import logger, generate_request_id
from app.services.image_processor import image_processor


class PredictorService:
    def __init__(self):
        self.model_manager = model_manager
        self.image_processor = image_processor
    
    def predict(self, image_bytes: bytes, filename: str):
        start_time = time.perf_counter()
        
        is_valid, error_msg = self.image_processor.validate(filename, image_bytes)
        if not is_valid:
            raise ValueError(error_msg)
        
        img = self.image_processor.to_pil(image_bytes)
        result = self.model_manager.predictor.predict(img, top_k=1)
        
        confidence = result["confidence"] * 100
        class_name = result["class"]
        plant, disease = self._parse_class(class_name)
        
        processing_time = (time.perf_counter() - start_time) * 1000
        
        return {
            "prediction": class_name,
            "plant": plant,
            "disease": disease,
            "confidence": round(confidence, 2),
            "processing_time_ms": round(processing_time, 2),
            "model_version": settings.MODEL_VERSION,
        }
    
    def _parse_class(self, name: str):
        if "___" in name:
            parts = name.split("___", 1)
            return parts[0].replace("_", " "), parts[1].replace("_", " ")
        return "Unknown", name.replace("_", " ")


predictor = PredictorService()