#!/usr/bin/env python3
"""
Plant Disease Predictor — Backend Inference Module
Compatible with model_v1.pt produced by the Kaggle training notebook.
"""

import os
from typing import Union, List
from pathlib import Path

import torch
import torch.nn as nn
from PIL import Image
import torchvision.transforms as T


class PlantDiseaseResNet34(nn.Module):
    def __init__(self, num_classes: int = 38, dropout: float = 0.3):
        super().__init__()
        from torchvision.models import resnet34
        self.backbone = resnet34(weights=None)
        in_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(p=dropout),
            nn.Linear(in_features, num_classes)
        )
    
    def forward(self, x):
        return self.backbone(x)


class PlantDiseasePredictor:
    """
    One-line initialization, one-line prediction.
    
    Usage:
        predictor = PlantDiseasePredictor("model_v1.pt")
        result = predictor.predict("leaf.jpg")
    """
    
    def __init__(self, checkpoint_path: str, device: str = None):
        self.device = torch.device(
            device or ("cuda" if torch.cuda.is_available() else "cpu")
        )
        
        checkpoint = torch.load(checkpoint_path, map_location=self.device, weights_only=False)
        
        self.class_to_idx = checkpoint["class_to_idx"]
        self.idx_to_class = {int(k): v for k, v in checkpoint["idx_to_class"].items()}
        self.class_names = checkpoint["class_names"]
        
        prep = checkpoint["preprocessing"]
        self.image_size = prep["image_size"]
        self.transform = T.Compose([
            T.Resize((self.image_size, self.image_size)),
            T.ToTensor(),
            T.Normalize(mean=prep["mean"], std=prep["std"]),
        ])
        
        cfg = checkpoint["model_config"]
        self.model = PlantDiseaseResNet34(
            num_classes=cfg["num_classes"],
            dropout=cfg["dropout"]
        )
        state_dict = checkpoint["model_state_dict"]
        # Remove _orig_mod. prefix added by torch.compile()
        state_dict = {k.replace("_orig_mod.", ""): v for k, v in state_dict.items()}
        self.model.load_state_dict(state_dict)
        self.model.to(self.device)
        self.model.eval()
    
    def preprocess(self, image: Union[str, Image.Image]) -> torch.Tensor:
        if isinstance(image, str):
            image = Image.open(image).convert("RGB")
        return self.transform(image).unsqueeze(0).to(self.device)
    
    @torch.no_grad()
    def predict(self, image: Union[str, Image.Image], top_k: int = 3) -> dict:
        tensor = self.preprocess(image)
        
        with torch.autocast(device_type=str(self.device)):
            outputs = self.model(tensor)
            probs = torch.softmax(outputs, dim=1)
        
        top_probs, top_indices = torch.topk(probs, k=min(top_k, len(self.class_names)), dim=1)
        top_probs = top_probs.squeeze(0).float().cpu().numpy()
        top_indices = top_indices.squeeze(0).cpu().numpy()
        
        top_k_results = [
            {"class": self.idx_to_class[int(idx)], "confidence": float(prob)}
            for idx, prob in zip(top_indices, top_probs)
        ]
        
        return {
            "class": top_k_results[0]["class"],
            "confidence": top_k_results[0]["confidence"],
            "class_index": int(top_indices[0]),
            "top_k": top_k_results,
        }
    
    @torch.no_grad()
    def predict_batch(self, images: List[Union[str, Image.Image]], top_k: int = 1) -> List[dict]:
        tensors = torch.cat([self.preprocess(img) for img in images], dim=0)
        
        with torch.autocast(device_type=str(self.device)):
            outputs = self.model(tensors)
            probs = torch.softmax(outputs, dim=1)
        
        results = []
        for p in probs:
            k = min(top_k, len(self.class_names))
            tp, ti = torch.topk(p, k=k)
            tp = tp.float().cpu().numpy()
            ti = ti.cpu().numpy()
            results.append({
                "class": self.idx_to_class[int(ti[0])],
                "confidence": float(tp[0]),
                "class_index": int(ti[0]),
                "top_k": [
                    {"class": self.idx_to_class[int(idx)], "confidence": float(pr)}
                    for idx, pr in zip(ti, tp)
                ]
            })
        return results


# Backend compatibility helper
def load_model_for_backend(checkpoint_path: str):
    """Returns (model, class_names, transform) for existing backend code."""
    predictor = PlantDiseasePredictor(checkpoint_path)
    return predictor.model, predictor.class_names, predictor.transform