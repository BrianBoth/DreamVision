from fastapi import APIRouter, Body, Depends
from services.image_service import generate_img
from services.auth_service import token_check
from services.sentiment_service import dream_classifier
from models.dream_model import Dream
from services.dream_storage import store_dream
from services.video_storage import video_upload

router = APIRouter()

@router.post("/process-dream", response_model=Dream)
async def dream_services(dream: Dream = Body(...), user: dict = Depends(token_check)):
    print(dream.dream_title, dream.dream_text, dream.userid)
    # image_url = generate_img(dream.dream_text)
    image_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUAfyVe3Easiycyh3isP9wDQTYuSmGPsPQvLIJdEYvQ_DsFq5Ez2Nh_QjiS3oZ3B8ZPfK9cZQyIStmQMV1lDPLw"
    perm_url = video_upload(image_url, dream.userid)
    sentiment = dream_classifier(dream.dream_text)
    if sentiment == 0:
        sentiment = "nightmare"
    else:
        sentiment = "dream"
    print(image_url)
    return await store_dream(dream.userid, perm_url, dream.dream_text, sentiment, dream.dream_title)
