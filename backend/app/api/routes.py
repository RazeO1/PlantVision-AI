"""FastAPI route definitions."""

from fastapi import APIRouter, UploadFile, File, HTTPException, Request
from fastapi.responses import JSONResponse

from app.config import settings
from app.core.model_loader import model_manager
from app.core.logger import generate_request_id, logger
from app.services.predictor import predictor
from app.services.metadata_service import metadata_service
from app.schemas.prediction import (
    HealthResponse,
    ModelInfoResponse,
    ClassesResponse,
    PredictionResponse,
    ErrorResponse,
    PlantClass,
    TreatmentInfo,
)


router = APIRouter(prefix="/api/v1")


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check backend and model health."""
    return HealthResponse(
        status="healthy",
        version=settings.VERSION,
        model_loaded=model_manager.loaded,
        model_version=settings.MODEL_VERSION,
    )


@router.get("/model", response_model=ModelInfoResponse)
async def model_info():
    """Get current model metadata."""
    return ModelInfoResponse(
        version=settings.MODEL_VERSION,
        accuracy=0.904,  # Update with actual accuracy
        total_classes=model_manager.num_classes,
        last_updated="2024-07-01",  # Update with actual date
        input_size=settings.MODEL_INPUT_SIZE,
    )


@router.get("/classes", response_model=ClassesResponse)
async def list_classes():
    """List all supported plant/disease classes."""
    classes = metadata_service.get_all_classes()
    return ClassesResponse(
        total=len(classes),
        classes=[PlantClass(**c) for c in classes],
    )


@router.post("/predict", response_model=PredictionResponse)
async def predict(
    request: Request,
    file: UploadFile = File(..., description="Plant leaf image (JPG, PNG, WEBP)"),
):
    """
    Run AI disease detection on uploaded image.
    
    Returns prediction, confidence score, severity, and treatment recommendations.
    """
    request_id = generate_request_id()
    
    try:
        # Read file content
        content = await file.read()
        
        # Run prediction
        result = predictor.predict(content, file.filename)
        
        # Get treatment metadata
        treatment = metadata_service.get_treatment(result["disease"])
        
        # Log prediction
        logger.log(
            request_id=request_id,
            confidence=result["confidence"],
            prediction=result["prediction"],
            processing_time_ms=result["processing_time_ms"],
            model_version=result["model_version"],
        )
        
        return PredictionResponse(
            success=True,
            prediction=result["prediction"],
            plant=result["plant"],
            disease=result["disease"],
            confidence=result["confidence"],
            severity=treatment.severity,
            treatment=treatment,
            processing_time_ms=result["processing_time_ms"],
            model_version=result["model_version"],
            request_id=request_id,
        )
        
    except ValueError as e:
        # Validation errors
        return JSONResponse(
            status_code=400,
            content=ErrorResponse(
                success=False,
                error="Invalid request",
                detail=str(e),
                request_id=request_id,
            ).model_dump(),
        )

    except Exception as e:
        import traceback
        traceback.print_exc()  # This prints the full error to your terminal
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": "Prediction failed",
                "detail": str(e),
                "request_id": request_id,
            },
        )


@router.get("/treatment/{disease_name}")
async def get_treatment(disease_name: str):
    """Get treatment info for a specific disease."""
    treatment = metadata_service.get_treatment(disease_name)
    return treatment