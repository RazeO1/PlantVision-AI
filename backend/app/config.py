"""Application configuration loaded from environment variables."""

import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Base paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
MODELS_DIR = BASE_DIR / "models"
LOGS_DIR = BASE_DIR / "logs"

# Ensure directories exist
LOGS_DIR.mkdir(exist_ok=True)


class Settings(BaseSettings):
    """Application settings."""
    
    APP_NAME: str = "PlantVision AI"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # CORS - Add your Vercel domain here
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]  # Restrict in production
    
    # File upload limits
    MAX_UPLOAD_SIZE_MB: int = 10
    ALLOWED_EXTENSIONS: set[str] = {".jpg", ".jpeg", ".png", ".webp"}
    
    # Model configuration
    MODEL_PATH: str = str(MODELS_DIR / "model_v1.pt")
    MODEL_VERSION: str = "1.0.0"
    MODEL_INPUT_SIZE: int = 224  # Standard ResNet/EfficientNet input
    
    # Image preprocessing
    NORMALIZE_MEAN: list[float] = [0.485, 0.456, 0.406]
    NORMALIZE_STD: list[float] = [0.229, 0.224, 0.225]
    
    # Performance
    CONFIDENCE_THRESHOLD: float = 0.5
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()