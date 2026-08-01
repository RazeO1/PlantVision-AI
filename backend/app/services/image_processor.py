"""Image validation only. Preprocessing is handled by the inference wrapper."""

import io
from pathlib import Path

from PIL import Image
from app.config import settings


class ImageProcessor:
    def __init__(self):
        self.max_size_mb = settings.MAX_UPLOAD_SIZE_MB
        self.allowed_extensions = settings.ALLOWED_EXTENSIONS
    
    def validate(self, filename: str, content: bytes):
        ext = Path(filename).suffix.lower()
        if ext not in self.allowed_extensions:
            return False, f"Unsupported format: {ext}"
        
        size_mb = len(content) / (1024 * 1024)
        if size_mb > self.max_size_mb:
            return False, f"File too large: {size_mb:.1f}MB"
        
        try:
            img = Image.open(io.BytesIO(content))
            img.verify()
        except Exception:
            return False, "Invalid image file"
        
        return True, ""
    
    def to_pil(self, content: bytes):
        return Image.open(io.BytesIO(content)).convert("RGB")


image_processor = ImageProcessor()