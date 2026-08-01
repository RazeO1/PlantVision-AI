import json
from app.core.inference import PlantDiseasePredictor

p = PlantDiseasePredictor("models/model_v1.pt")

classes = []

for i, name in enumerate(p.class_names):
    if "___" in name:
        plant, disease = name.split("___", 1)
    else:
        plant, disease = "Unknown", name

    classes.append({
        "id": i,
        "plant": plant.replace("_", " "),
        "disease": disease.replace("_", " "),
        "severity": "Unknown"
    })

with open("data/classes.json", "w") as f:
    json.dump(classes, f, indent=2)

print(f"Generated classes.json with {len(classes)} classes")