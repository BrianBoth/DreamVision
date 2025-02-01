from pydantic import BaseModel

class ImageRequest(BaseModel):
  text: str

class ImageResponse(BaseModel):
  img_url: str