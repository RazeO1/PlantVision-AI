"""Image preprocessing pipeline."""

import io
from pathlib import Path
from typing import Tuple

from PIL import Image
import torch
import torchvision.transforms as transforms

from app.config import settings


class ImageProcessor:
    """Handles image validation and preprocessing for model inference."""
    
    def __init__(self):
        self.max_size_mb = settings.MAX_UPLOAD_SIZE_MB
        self.allowed_extensions = settings.ALLOWED_EXTENSIONS
        self.input_size = settings.MODEL_INPUT_SIZE
        
        # Standard ImageNet preprocessing
        self.transform = transforms.Compose([
            transforms.Resize((self.input_size, self.input_size)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=settings.NORMALIZE_MEAN,
                std=settings.NORMALIZE_STD,
            ),
        ])
    
    def validate(self, filename: str, content: bytes) -> Tuple[bool, str]:
        """
        Validate uploaded image.
        Returns (is_valid, error_message).
        """
        # Check extension
        ext = Path(filename).suffix.lower()
        if ext not in self.allowed_extensions:
            return False, f"Unsupported format: {ext}. Allowed: {', '.join(self.allowed_extensions)}"
        
        # Check size
        size_mb = len(content) / (1024 * 1024)
        if size_mb > self.max_size_mb:
            return False, f"File too large: {size_mb:.1f}MB. Max: {self.max_size_mb}MB"
        
        # Check image integrity
        try:
            img = Image.open(io.BytesIO(content))
            img.verify()  # Verify without loading
        except Exception:
            return False, "Invalid or corrupted image file"
        
        return True, ""
    
    def preprocess(self, content: bytes) -> torch.Tensor:
        """
        Convert raw image bytes to model-ready tensor.
        Returns tensor of shape (1, 3, H, W).
        """
        img = Image.open(io.BytesIO(content)).convert("RGB")
        tensor = self.transform(img)
        return tensor.unsqueeze(0)  # Add batch dimension


# Singleton
image_processor = ImageProcessor()