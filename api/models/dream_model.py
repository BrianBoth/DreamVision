from pydantic import BaseModel

class Dream(BaseModel):
  userid: int
  dream_title: str
  dream_text: str
