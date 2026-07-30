"""Pydantic schemas for API request/response validation."""

from pydantic import BaseModel, Field
from typing import Optional


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = "healthy"
    version: str
    model_loaded: bool
    model_version: str


class ModelInfoResponse(BaseModel):
    """Model metadata response."""
    version: str
    accuracy: float = Field(default=0.0, ge=0.0, le=1.0)
    total_classes: int
    last_updated: Optional[str] = None
    input_size: int


class PlantClass(BaseModel):
    """Individual plant/disease class."""
    id: int
    plant: str
    disease: str
    severity: str = "unknown"


class ClassesResponse(BaseModel):
    """List of supported classes."""
    total: int
    classes: list[PlantClass]


class TreatmentInfo(BaseModel):
    """Treatment and disease information."""
    disease: str
    description: str
    symptoms: list[str]
    causes: list[str]
    treatment: list[str]
    prevention: list[str]
    severity: str


class PredictionResponse(BaseModel):
    """Main prediction API response."""
    success: bool = True
    prediction: str
    plant: str
    disease: str
    confidence: float = Field(ge=0.0, le=100.0)
    severity: str
    treatment: TreatmentInfo
    processing_time_ms: float
    model_version: str
    request_id: str


class ErrorResponse(BaseModel):
    """Standardized error response."""
    success: bool = False
    error: str
    detail: Optional[str] = None
    request_id: Optional[str] = None