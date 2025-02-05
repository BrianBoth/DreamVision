from pydantic import BaseModel

class User(BaseModel):
  email: str
  password: str

class UserSignup(BaseModel):
  username: str
  email: str
  password: str

class UserIdentifier(BaseModel):
  userid: int
