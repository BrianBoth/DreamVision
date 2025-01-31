from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from videoStorage import video_upload
from videoGen import generate_img
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Dream Journal API!"}

@app.post("/generateimage")
def image_route(image_request: ImageRequest = Body(...)):
    print("inside image route")
    text = image_request.text

    img_url = generate_img(text)
    print(img_url)
    return {"img_url": img_url}
