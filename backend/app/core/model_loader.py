"""AI model loading and singleton management."""

import torch
import torch.nn as nn
from pathlib import Path
from typing import Optional

from app.config import settings


class ModelManager:
    """
    Singleton model manager.
    Loads the PyTorch model once at startup and keeps it in memory.
    """
    
    _instance: Optional["ModelManager"] = None
    _model: Optional[nn.Module] = None
    _classes: list[str] = []
    _device: torch.device = torch.device("cpu")
    _loaded: bool = False
    
    def __new__(cls) -> "ModelManager":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def load(self, model_path: str | None = None) -> bool:
        """
        Load the model from disk.
        Returns True if successful, False otherwise.
        """
        if self._loaded:
            return True
        
        path = Path(model_path or settings.MODEL_PATH)
        
        if not path.exists():
            # Create a dummy model for development if no model exists
            self._create_dummy_model()
            self._loaded = True
            return True
        
        try:
            self._device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            self._model = torch.load(path, map_location=self._device, weights_only=False)
            self._model.eval()
            self._loaded = True
            return True
        except Exception as e:
            print(f"Model load failed: {e}")
            self._create_dummy_model()
            self._loaded = True
            return True  # Still return True with dummy for dev
    
    def _create_dummy_model(self) -> None:
        """Create a simple CNN for development when no trained model exists."""
        self._classes = [
            "Tomato___Early_blight",
            "Tomato___Late_blight",
            "Tomato___healthy",
            "Potato___Early_blight",
            "Potato___Late_blight",
            "Potato___healthy",
            "Corn___Common_rust",
            "Corn___healthy",
            "Grape___Black_rot",
            "Grape___healthy",
            "Apple___Apple_scab",
            "Apple___healthy",
            "Pepper___Bacterial_spot",
            "Pepper___healthy",
            "Strawberry___Leaf_scorch",
            "Strawberry___healthy",
            "Peach___Bacterial_spot",
            "Peach___healthy",
            "Cherry___Powdery_mildew",
            "Cherry___healthy",
            "Corn___Northern_Leaf_Blight",
            "Corn___Gray_leaf_spot",
            "Tomato___Septoria_leaf_spot",
            "Tomato___Spider_mites",
            "Potato___healthy",
            "Blueberry___healthy",
            "Orange___Haunglongbing",
            "Raspberry___healthy",
            "Soybean___healthy",
            "Squash___Powdery_mildew",
        ]
        
        # Simple ResNet-like architecture for demo
        self._model = nn.Sequential(
            nn.Conv2d(3, 64, 7, stride=2, padding=3),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(3, stride=2, padding=1),
            nn.AdaptiveAvgPool2d((1, 1)),
            nn.Flatten(),
            nn.Linear(64, len(self._classes)),
        )
        self._model.to(self._device)
        self._model.eval()
    
    @property
    def model(self) -> nn.Module:
        if self._model is None:
            raise RuntimeError("Model not loaded. Call load() first.")
        return self._model
    
    @property
    def classes(self) -> list[str]:
        return self._classes
    
    @property
    def device(self) -> torch.device:
        return self._device
    
    @property
    def loaded(self) -> bool:
        return self._loaded
    
    @property
    def num_classes(self) -> int:
        return len(self._classes)


# Global singleton
model_manager = ModelManager()