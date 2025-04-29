from fastapi import FastAPI
from pydantic import BaseModel
import torch
from model_loader import load_model
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.requests import Request

# создание FastAPI
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# загрузка модели
model = load_model("mlp_model.pth")

# определение структуры входных данных
class SymptomsData(BaseModel):
    symptoms: list  # список значений симптомов

# эндпоинт для предсказаний, пост запрос
@app.post("/predict")
async def predict(data: SymptomsData):
    # преобразование входных данных
    symptoms = torch.tensor(data.symptoms, dtype=torch.float32).unsqueeze(0)

    with torch.no_grad():
        outputs = model(symptoms)
        probabilities = outputs.numpy()[0]

    # ответ
    diseases = ["перелом", "вывих", "травма мышц и сухожилий", "здоров"]
    result = {disease: float(prob) for disease, prob in zip(diseases, probabilities)}
    return result


@app.get("/predict")
async def predict_get():
    return {"message": "Этот маршрут принимает только POST-запросы. Отправьте JSON с полем 'symptoms'."}

@app.options("/predict")
async def options_predict(request: Request):
    return JSONResponse(
        status_code=200,
        content={"message": "Preflight OK"},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        }
    )