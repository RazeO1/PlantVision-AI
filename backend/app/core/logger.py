"""Structured logging for predictions and errors."""

import json
import uuid
import time
from datetime import datetime
from pathlib import Path
from typing import Any

from app.config import LOGS_DIR


class PredictionLogger:
    """Logs prediction metadata to JSON lines file."""
    
    def __init__(self):
        self.log_file = LOGS_DIR / f"predictions_{datetime.now().strftime('%Y%m')}.jsonl"
    
    def log(
        self,
        request_id: str,
        confidence: float,
        prediction: str,
        processing_time_ms: float,
        model_version: str,
        error: str | None = None,
    ) -> None:
        """Log a single prediction event."""
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "request_id": request_id,
            "confidence": round(confidence, 4),
            "prediction": prediction,
            "processing_time_ms": round(processing_time_ms, 2),
            "model_version": model_version,
            "error": error,
        }
        
        with open(self.log_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")


def generate_request_id() -> str:
    """Generate a unique request identifier."""
    return f"pv-{uuid.uuid4().hex[:12]}"


# Singleton instance
logger = PredictionLogger()