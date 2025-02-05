from fastapi import APIRouter, Body, Depends
from services.image_service import generate_img
from services.auth_service import token_check
from services.sentiment_service import dream_classifier
from models.dream_model import Dream
from services.dream_storage import store_dream

router = APIRouter()

@router.post("/process-dream", response_model=Dream)
async def dream_services(dream: Dream = Body(...), user: dict = Depends(token_check)):
    image_url = generate_img(dream.dream_text)
    sentiment = dream_classifier(dream.dream_text)
    if sentiment == 0:
        sentiment = "nightmare"
    else:
        sentiment = "dream"
    return await store_dream(dream.userid, image_url, dream.dream_text, sentiment)
