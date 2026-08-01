"""AI model loading using the trained inference wrapper."""

from pathlib import Path
from app.config import settings
from app.core.inference import PlantDiseasePredictor


class ModelManager:
    _instance = None
    _predictor = None
    _loaded = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def load(self, model_path=None):
        if self._loaded:
            return True
        
        path = Path(model_path or settings.MODEL_PATH)
        
        if not path.exists():
            print(f"❌ Model not found at {path}")
            return False
        
        try:
            self._predictor = PlantDiseasePredictor(str(path))
            self._loaded = True
            print(f"✅ Loaded {self.num_classes} classes from model")
            return True
        except Exception as e:
            print(f"❌ Model load failed: {e}")
            return False
    
    @property
    def predictor(self):
        if self._predictor is None:
            raise RuntimeError("Model not loaded")
        return self._predictor
    
    @property
    def classes(self):
        return self._predictor.class_names if self._predictor else []
    
    @property
    def device(self):
        return self._predictor.device if self._predictor else None
    
    @property
    def loaded(self):
        return self._loaded
    
    @property
    def num_classes(self):
        return len(self.classes)


model_manager = ModelManager()