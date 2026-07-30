"""Disease metadata and treatment recommendations."""

import json
from pathlib import Path
from typing import Optional

from app.config import DATA_DIR
from app.schemas.prediction import TreatmentInfo


class MetadataService:
    """Loads and serves disease metadata from JSON files."""
    
    def __init__(self):
        self.classes_file = DATA_DIR / "classes.json"
        self.treatments_file = DATA_DIR / "treatments.json"
        self._classes: list[dict] = []
        self._treatments: dict[str, dict] = {}
        self._load()
    
    def _load(self) -> None:
        """Load metadata from JSON files."""
        if self.treatments_file.exists():
            with open(self.treatments_file, "r", encoding="utf-8") as f:
                self._treatments = json.load(f)
        else:
            self._treatments = self._default_treatments()
        
        if self.classes_file.exists():
            with open(self.classes_file, "r", encoding="utf-8") as f:
                self._classes = json.load(f)
        else:
            self._classes = self._default_classes()
    
    def _default_treatments(self) -> dict[str, dict]:
        """Default treatment data when file doesn't exist."""
        return {
            "Early_blight": {
                "disease": "Early Blight",
                "description": "A fungal disease caused by Alternaria solani, appearing as dark brown spots with concentric rings on older leaves.",
                "symptoms": ["Dark brown spots with target-like rings", "Yellowing of lower leaves", "Leaf drop in severe cases"],
                "causes": ["Fungus Alternaria solani", "Warm humid conditions", "Poor air circulation"],
                "treatment": ["Apply copper-based fungicide", "Remove infected lower leaves", "Ensure proper plant spacing", "Water at the base, avoid wetting foliage"],
                "prevention": ["Rotate crops annually", "Use resistant varieties", "Mulch to prevent soil splash", "Maintain proper plant nutrition"],
                "severity": "Moderate",
            },
            "Late_blight": {
                "disease": "Late Blight",
                "description": "A devastating disease caused by Phytophthora infestans that affects tomatoes and potatoes.",
                "symptoms": ["Dark water-soaked lesions on leaves", "White fungal growth on leaf undersides", "Rapid plant collapse"],
                "causes": ["Oomycete Phytophthora infestans", "Cool wet weather", "High humidity"],
                "treatment": ["Apply fungicide immediately", "Destroy all infected plant material", "Avoid overhead irrigation", "Harvest tubers early if on potatoes"],
                "prevention": ["Plant resistant varieties", "Ensure good drainage", "Space plants for airflow", "Remove volunteer plants"],
                "severity": "Critical",
            },
            "Common_rust": {
                "disease": "Common Rust",
                "description": "A fungal disease caused by Puccinia sorghi that produces reddish-brown pustules on corn leaves.",
                "symptoms": ["Small reddish-brown pustules", "Yellow halos around spots", "Leaf drying and death in severe cases"],
                "causes": ["Fungus Puccinia sorghi", "Moderate temperatures with high humidity", "Wind-borne spores"],
                "treatment": ["Apply fungicide if severity exceeds 5%", "Plant resistant hybrids", "Scout fields regularly during humid conditions"],
                "prevention": ["Plant resistant varieties", "Rotate with non-host crops", "Remove crop debris", "Monitor weather conditions"],
                "severity": "Low",
            },
            "Black_rot": {
                "disease": "Black Rot",
                "description": "A fungal disease caused by Guignardia bidwellii that affects grapevines.",
                "symptoms": ["Circular reddish-brown spots on leaves", "Shriveled black berries (mummies)", "Cane lesions"],
                "causes": ["Fungus Guignardia bidwellii", "Warm wet springs", "Overhead irrigation"],
                "treatment": ["Prune and destroy infected canes", "Apply fungicide during bloom", "Remove mummified berries", "Improve air circulation"],
                "prevention": ["Practice proper sanitation", "Apply preventive fungicides", "Train vines for airflow", "Choose resistant rootstocks"],
                "severity": "High",
            },
            "Apple_scab": {
                "disease": "Apple Scab",
                "description": "A common fungal disease caused by Venturia inaequalis affecting apple trees.",
                "symptoms": ["Olive-green to black spots on leaves", "Corky scabs on fruit", "Premature leaf drop"],
                "causes": ["Fungus Venturia inaequalis", "Cool wet springs", "Overhead watering"],
                "treatment": ["Apply fungicide at green tip stage", "Rake and destroy fallen leaves", "Prune for better air circulation"],
                "prevention": ["Plant resistant varieties", "Space trees properly", "Avoid overhead irrigation", "Apply preventive sprays"],
                "severity": "Moderate",
            },
            "Bacterial_spot": {
                "disease": "Bacterial Spot",
                "description": "A bacterial disease caused by Xanthomonas campestris affecting peppers and peaches.",
                "symptoms": ["Small water-soaked spots on leaves", "Dark raised spots on fruit", "Leaf yellowing and defoliation"],
                "causes": ["Bacterium Xanthomonas campestris", "Warm wet conditions", "Splashing rain"],
                "treatment": ["Apply copper-based bactericide", "Remove infected plant debris", "Avoid working in wet fields", "Use disease-free seeds"],
                "prevention": ["Use resistant varieties", "Rotate crops", "Avoid overhead irrigation", "Sanitize tools regularly"],
                "severity": "High",
            },
            "Leaf_scorch": {
                "disease": "Leaf Scorch",
                "description": "A fungal disease affecting strawberry plants caused by Diplocarpon earlianum.",
                "symptoms": ["Purple to reddish spots on leaves", "Brown scorched leaf edges", "Reduced fruit production"],
                "causes": ["Fungus Diplocarpon earlianum", "Prolonged leaf wetness", "Dense plantings"],
                "treatment": ["Remove infected leaves", "Apply appropriate fungicide", "Improve air circulation", "Avoid overhead watering"],
                "prevention": ["Plant resistant varieties", "Space plants properly", "Use mulch to prevent splash", "Rotate strawberry beds"],
                "severity": "Low",
            },
            "healthy": {
                "disease": "Healthy",
                "description": "The plant appears healthy with no detectable disease symptoms.",
                "symptoms": ["Vibrant green leaves", "Normal growth patterns", "No spots or lesions"],
                "causes": ["Good agricultural practices", "Proper nutrition", "Adequate water and sunlight"],
                "treatment": ["Continue current care practices", "Monitor for early signs of disease", "Maintain plant health"],
                "prevention": ["Regular monitoring", "Balanced fertilization", "Proper irrigation", "Good sanitation practices"],
                "severity": "None",
            },
        }
    
    def _default_classes(self) -> list[dict]:
        """Default class list when file doesn't exist."""
        from app.core.model_loader import model_manager
        classes = []
        for i, cls in enumerate(model_manager.classes):
            plant, disease = self._parse_class(cls)
            classes.append({
                "id": i,
                "plant": plant,
                "disease": disease,
                "severity": self.get_treatment(disease).severity if disease != "healthy" else "None",
            })
        return classes
    
    def _parse_class(self, class_name: str) -> tuple[str, str]:
        if "___" in class_name:
            parts = class_name.split("___", 1)
            return parts[0].replace("_", " "), parts[1].replace("_", " ")
        return "Unknown", class_name.replace("_", " ")
    
    def get_treatment(self, disease_name: str) -> TreatmentInfo:
        """Get treatment info for a disease."""
        # Try exact match first
        key = disease_name.replace(" ", "_")
        data = self._treatments.get(key)
        
        # Fallback to generic healthy
        if data is None:
            data = self._treatments.get("healthy", {})
        
        return TreatmentInfo(**data)
    
    def get_all_classes(self) -> list[dict]:
        """Return all supported classes."""
        return self._classes


# Singleton
metadata_service = MetadataService()