from pydantic import BaseModel

class Dream(BaseModel):
  userid: int
  dream_text: str
