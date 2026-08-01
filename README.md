<div align="center">

# 🌿 PlantVision AI

### AI-Powered Plant Disease Detection Platform

Detect plant diseases in seconds using deep learning, receive instant treatment recommendations, and help farmers make informed decisions through a modern web application.

<p>

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?style=for-the-badge&logo=fastapi)
![PyTorch](https://img.shields.io/badge/PyTorch-2.x-EE4C2C?style=for-the-badge&logo=pytorch)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

<p>

<img src="https://img.shields.io/github/stars/RazeO1/PlantVision-AI?style=social" />
<img src="https://img.shields.io/github/forks/RazeO1/PlantVision-AI?style=social" />

</p>

---

### 🌱 From Image → AI Diagnosis → Treatment Recommendation

*A production-ready AI platform combining a modern Next.js frontend with a FastAPI inference backend powered by a ResNet34 deep learning model trained on the PlantVillage dataset.*

</div>

---

# 📖 Overview

Plant diseases are one of the major causes of crop loss worldwide. Early detection can significantly reduce economic losses, improve crop yield, and help farmers make timely treatment decisions.

**PlantVision AI** provides an intelligent disease detection platform that allows users to upload a leaf image and receive:

- 🌿 Plant Identification
- 🦠 Disease Prediction
- 📊 Confidence Score
- 💊 Treatment Recommendation
- 📈 AI-powered Analysis

The project combines a responsive web interface with a high-performance AI inference backend to deliver near real-time predictions.

---

# ✨ Features

## 🖼️ Image Upload

- Drag & Drop Upload
- Image Preview
- Mobile Friendly
- Multiple Image Format Support

---

## 🤖 AI Detection

- Deep Learning powered by ResNet34
- 38 Disease Classes
- 14 Plant Species
- Confidence Score Prediction
- Top-K Predictions

---

## 💊 Treatment System

- Disease Information
- Recommended Treatments
- Healthy Plant Detection
- Metadata-driven Suggestions

---

## ⚡ Performance

- FastAPI Backend
- PyTorch Inference
- GPU Support
- Optimized Image Processing
- Modular Architecture
- REST API

---

# 🎥 Demo

> Screenshots and GIFs will be added here.

| Landing Page | Upload | Prediction |
|--------------|---------|------------|
| *(Coming Soon)* | *(Coming Soon)* | *(Coming Soon)* |

| Disease Analysis | Treatment | Mobile View |
|-----------------|-----------|-------------|
| *(Coming Soon)* | *(Coming Soon)* | *(Coming Soon)* |

# 🏗️ System Architecture

```text
                                    🌿 PlantVision AI

 ┌───────────────────────────────────────────────────────────────────────┐
 │                           Next.js Frontend                            │
 │                                                                       │
 │  Landing Page  │  Upload Image  │  Results  │  Treatment Dashboard    │
 └───────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 │ HTTP (REST API)
                                 ▼
 ┌───────────────────────────────────────────────────────────────────────┐
 │                           FastAPI Backend                             │
 │                                                                       │
 │  Image Validation                                                     │
 │  Image Preprocessing                                                  │
 │  Model Inference                                                      │
 │  Disease Prediction                                                   │
 │  Confidence Calculation                                               │
 │  Treatment Recommendation                                             │
 └───────────────────────────────┬───────────────────────────────────────┘
                                 │
                                 ▼
 ┌───────────────────────────────────────────────────────────────────────┐
 │                       Deep Learning Inference                         │
 │                                                                       │
 │              ResNet34 Transfer Learning Model                         │
 │                                                                       │
 │                  PlantVillage Dataset (38 Classes)                    │
 └───────────────────────────────────────────────────────────────────────┘
```

---

# ⚙️ Tech Stack

## 🌐 Frontend

| Technology | Version | Purpose |
|------------|----------|---------|
| Next.js | 14 | React Framework |
| React | 18 | UI Library |
| TypeScript | 5 | Type Safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | Latest | Animations |
| Lucide React | Latest | Icons |
| ShadCN/UI | Latest | UI Components |

---

## ⚡ Backend

| Technology | Version | Purpose |
|------------|----------|---------|
| FastAPI | Latest | REST API |
| Python | 3.13 | Backend Language |
| PyTorch | 2.x | Deep Learning |
| TorchVision | Latest | Model & Transforms |
| Pillow | Latest | Image Processing |
| Uvicorn | Latest | ASGI Server |
| Pydantic | Latest | Data Validation |

---

## 🧠 AI & Machine Learning

| Component | Details |
|-----------|---------|
| Model | ResNet34 |
| Learning Type | Transfer Learning |
| Framework | PyTorch |
| Dataset | PlantVillage |
| Number of Classes | 38 |
| Plant Species | 14 |
| Input Resolution | 224 × 224 |
| Image Normalization | ImageNet Mean & Std |
| Output | Softmax Probability Distribution |

---

# 🤖 AI Model

PlantVision AI uses a **ResNet34 Transfer Learning** model trained on the **PlantVillage** dataset.

The model is optimized for accurate plant disease classification while maintaining fast inference times suitable for deployment in a web application.

## Model Pipeline

```text
Leaf Image
     │
     ▼
Resize (224×224)
     │
Normalize
(ImageNet Statistics)
     │
     ▼
ResNet34 Backbone
     │
     ▼
Dropout Layer
     │
     ▼
Fully Connected Layer
     │
     ▼
Softmax
     │
     ▼
Disease Prediction
```

---

# 📊 Model Performance

| Metric | Value |
|---------|-------|
| Architecture | ResNet34 |
| Dataset | PlantVillage |
| Plant Species | 14 |
| Disease Classes | 38 |
| Test Images | 17,572 |
| Test Accuracy | **99.78%** |
| Precision | **99.78%** |
| Recall | **99.77%** |
| F1 Score | **99.77%** |
| Input Size | 224 × 224 |

---

## Training Configuration

| Hyperparameter | Value |
|----------------|-------|
| Optimizer | AdamW |
| Learning Rate | 1e-3 (Scheduler Applied) |
| Batch Size | 32 |
| Epochs | 20 |
| Dropout | 0.3 |
| Loss Function | CrossEntropyLoss |
| Transfer Learning | Yes |
| Mixed Precision | Enabled (CUDA) |

---

## Training Progress

The model was trained using transfer learning with a staged fine-tuning strategy:

- ✅ Frozen backbone during initial training
- ✅ Gradual learning rate scheduling
- ✅ Full network fine-tuning after convergence
- ✅ Best checkpoint automatically saved
- ✅ Metadata exported for deployment
- ✅ Production-ready inference wrapper

---

# 📈 Performance Highlights

- 🚀 99.78% Test Accuracy
- 🌿 Supports 14 Plant Species
- 🦠 Detects 38 Plant Diseases
- ⚡ Optimized FastAPI Inference
- 📱 Responsive Modern UI
- 🔄 Metadata-Driven Predictions
- 🎯 Confidence-Based Classification
- 🧩 Modular Backend Architecture

# 🚀 Quick Start

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

| Software | Version |
|-----------|----------|
| Node.js | 18+ |
| Python | 3.11+ |
| Git | Latest |
| npm | Latest |
| pip | Latest |

---

# 📥 Clone Repository

```bash
git clone https://github.com/RazeO1/PlantVision-AI.git

cd PlantVision-AI
```

---

# ⚙️ Backend Setup

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate it.

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Start the FastAPI server.

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

API Documentation:

```
http://localhost:8000/docs
```

---

# 🌐 Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🔥 Running Both

Open two terminals.

### Terminal 1

```bash
cd backend

venv\Scripts\activate

uvicorn app.main:app --reload
```

### Terminal 2

```bash
cd frontend

npm run dev
```

Open

```
http://localhost:3000
```

and start detecting plant diseases.

---

# 🔌 API Reference

## POST `/predict`

Uploads a plant image and returns disease prediction.

### Request

```http
POST /predict
Content-Type: multipart/form-data
```

Body

| Field | Type | Required |
|---------|------|----------|
| file | Image | ✅ |

Supported formats

```
JPG
JPEG
PNG
```

---

## Successful Response

```json
{
  "success": true,
  "prediction": {
    "plant": "Tomato",
    "disease": "Late Blight",
    "confidence": 99.78,
    "severity": "Moderate"
  },
  "top_predictions": [
    {
      "disease": "Late Blight",
      "confidence": 99.78
    },
    {
      "disease": "Early Blight",
      "confidence": 0.18
    },
    {
      "disease": "Healthy",
      "confidence": 0.04
    }
  ],
  "processing_time_ms": 31
}
```

---

## Invalid Image

```json
{
    "detail":"Invalid image uploaded."
}
```

---

## Unsupported File

```json
{
    "detail":"Only JPG, JPEG and PNG images are supported."
}
```

---

## Model Not Loaded

```json
{
    "detail":"Model is unavailable. Please try again later."
}
```

---

## Health Check

```http
GET /health
```

Response

```json
{
  "status":"healthy",
  "model":"loaded"
}
```

---

# ⚡ Performance

| Task | Time |
|--------|------|
| Image Upload | < 100 ms |
| Image Preprocessing | ~5 ms |
| Model Inference (GPU) | ~15–25 ms |
| Total API Response | < 100 ms |

> Actual inference time depends on deployment hardware.

---

# 🔒 Environment Variables

Create a `.env` file inside the backend directory.

```env
MODEL_PATH=models/model_v1.pt

API_HOST=0.0.0.0

API_PORT=8000

ALLOWED_ORIGINS=http://localhost:3000
```

Example frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

# 🌿 Supported Plants & Diseases

PlantVision AI currently supports **14 plant species** and **38 plant disease classes**, trained on the **PlantVillage** dataset.

| 🌱 Plant | Diseases Supported |
|-----------|-------------------|
| 🍎 Apple | Apple Scab, Black Rot, Cedar Apple Rust, Healthy |
| 🫐 Blueberry | Healthy |
| 🍒 Cherry | Powdery Mildew, Healthy |
| 🌽 Corn | Cercospora Leaf Spot, Common Rust, Northern Leaf Blight, Healthy |
| 🍇 Grape | Black Rot, Esca (Black Measles), Leaf Blight, Healthy |
| 🍊 Orange | Citrus Greening (HLB) |
| 🍑 Peach | Bacterial Spot, Healthy |
| 🫑 Bell Pepper | Bacterial Spot, Healthy |
| 🥔 Potato | Early Blight, Late Blight, Healthy |
| 🍓 Raspberry | Healthy |
| 🌱 Soybean | Healthy |
| 🎃 Squash | Powdery Mildew |
| 🍓 Strawberry | Leaf Scorch, Healthy |
| 🍅 Tomato | Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy |

---

# 📸 Screenshots

> **Screenshots will be updated as the project evolves.**

## 🖥️ Desktop View

| Landing Page | Upload Page |
|---------------|------------|
| ![](docs/screenshots/home.png) | ![](docs/screenshots/upload.png) |

| Prediction Result | Treatment Recommendation |
|-------------------|--------------------------|
| ![](docs/screenshots/result.png) | ![](docs/screenshots/treatment.png) |

---

## 📱 Mobile View

| Home | Upload | Result |
|------|--------|--------|
| ![](docs/mobile/home.png) | ![](docs/mobile/upload.png) | ![](docs/mobile/result.png) |

---

## 🎥 Demo GIF

> Coming Soon

```
docs/demo/demo.gif
```

---

# 📂 Project Structure

```text
PlantVision-AI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   │   ├── inference.py
│   │   │   ├── config.py
│   │   │   └── logger.py
│   │   ├── models
│   │   ├── services
│   │   ├── schemas
│   │   ├── utils
│   │   └── main.py
│   │
│   ├── data
│   │   ├── classes.json
│   │   └── treatments.json
│   │
│   ├── models
│   │   ├── model_v1.pt
│   │   └── metadata.json
│   │
│   ├── requirements.txt
│   └── README.md
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── lib
│   │   ├── styles
│   │   └── types
│   │
│   ├── package.json
│   ├── next.config.ts
│   └── tailwind.config.ts
│
├── docs
│   ├── screenshots
│   ├── mobile
│   └── demo
│
├── .gitignore
├── LICENSE
└── README.md
```

---

# 📁 Folder Description

| Folder | Purpose |
|---------|---------|
| **frontend/** | Modern Next.js application |
| **backend/** | FastAPI inference server |
| **models/** | Trained AI model and metadata |
| **data/** | Disease metadata & treatment database |
| **docs/** | Images, GIFs and documentation assets |

---

# 📦 Repository Statistics

| Metric | Value |
|----------|--------|
| Frontend | Next.js + React + TypeScript |
| Backend | FastAPI + PyTorch |
| AI Model | ResNet34 |
| Dataset | PlantVillage |
| Plants | 14 |
| Diseases | 38 |
| Accuracy | **99.78%** |
| Repository Type | Full Stack AI Application |

---

# 💡 Highlights

✅ Modern Responsive UI

✅ FastAPI REST API

✅ Deep Learning Powered Detection

✅ Metadata-driven Disease Information

✅ Treatment Recommendations

✅ Real-time Predictions

✅ Mobile Friendly

✅ Production Ready Architecture

✅ Modular Codebase

✅ Easy Deployment

# 🚀 Deployment

PlantVision AI can be deployed using multiple platforms depending on your requirements.

---

## 🐳 Docker

### Build Docker Image

```bash
docker build -t plantvision-ai .
```

### Run Container

```bash
docker run -p 8000:8000 plantvision-ai
```

---

## 🌐 Frontend Deployment (Vercel)

```bash
cd frontend

vercel
```

Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

---

## ⚡ Backend Deployment (Railway / Render)

Environment Variables

```env
MODEL_PATH=models/model_v1.pt

API_HOST=0.0.0.0

API_PORT=8000

ALLOWED_ORIGINS=https://your-domain.com
```

Start Command

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

---

## ☁️ Cloud Providers

| Platform | Supported |
|-----------|-----------|
| Vercel | ✅ |
| Railway | ✅ |
| Render | ✅ |
| Azure App Service | ✅ |
| Google Cloud Run | ✅ |
| AWS EC2 | ✅ |
| Docker | ✅ |

---

# 🛣️ Roadmap

### Current Version (v1.0)

- ✅ Plant Disease Classification
- ✅ 38 Disease Classes
- ✅ Treatment Recommendations
- ✅ Modern Next.js UI
- ✅ FastAPI Backend
- ✅ Deep Learning Inference
- ✅ Mobile Responsive

---

### Upcoming Features

- [ ] Explainable AI (Grad-CAM)
- [ ] Disease Severity Estimation
- [ ] Multi-leaf Detection
- [ ] Video-based Disease Detection
- [ ] User Authentication
- [ ] Cloud Image Storage
- [ ] Detection History
- [ ] Progressive Web App (PWA)
- [ ] Mobile Application
- [ ] ONNX Export
- [ ] TensorRT Optimization
- [ ] Multi-language Support
- [ ] Offline Prediction Mode
- [ ] AI Chat Assistant
- [ ] Farmer Dashboard

---

# 🤝 Contributing

Contributions are always welcome!

## Development Workflow

```bash
Fork Repository

↓

Create Feature Branch

↓

Implement Changes

↓

Test Thoroughly

↓

Commit Changes

↓

Open Pull Request
```

---

## Conventional Commits

Please use meaningful commit messages.

Examples

```text
feat: add disease severity prediction

fix: resolve image upload issue

docs: update README

refactor: optimize inference pipeline

style: improve hero section

perf: speed up preprocessing

test: add API unit tests
```

---

## Pull Request Checklist

- [ ] Code builds successfully
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No secrets committed
- [ ] Follows project style

---

# 📜 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Yash Raj

Permission is hereby granted, free of charge,
to any person obtaining a copy of this software
and associated documentation files (the "Software"),
to deal in the Software without restriction,
including without limitation the rights to use,
copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software
is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS",
WITHOUT WARRANTY OF ANY KIND.
```

---

# 🙏 Acknowledgements

Special thanks to the following projects and communities.

- 🌿 PlantVillage Dataset
- 🔥 PyTorch
- ⚡ FastAPI
- ▲ Next.js
- ⚛ React
- 🎨 Tailwind CSS
- 🎬 Framer Motion
- 💙 Open Source Community

---

# 📬 Contact

## 👨‍💻 Author

**Yash Raj**

GitHub

https://github.com/RazeO1

Project Repository

https://github.com/RazeO1/PlantVision-AI

Issues

https://github.com/RazeO1/PlantVision-AI/issues

Discussions

https://github.com/RazeO1/PlantVision-AI/discussions

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a Star!

It helps support the project and motivates future development.

Made with ❤️ using **Next.js**, **FastAPI**, and **PyTorch**

</div>