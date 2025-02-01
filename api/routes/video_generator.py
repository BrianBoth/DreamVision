from fastapi import APIRouter, Body, Depends
from models.image_model import ImageRequest, ImageResponse
from services.image_service import generate_img
from services.auth_service import get_current_user
from services.video_storage import video_upload

router = APIRouter()

@router.post("/generateimage", response_model=ImageResponse)
def generate_image(image_request: ImageRequest = Body(...), user: dict = Depends(get_current_user)):
    text = image_request.text
    temp_path = generate_img(text)
    public_url = video_upload(temp_path)
    return {"img_url": public_url}
