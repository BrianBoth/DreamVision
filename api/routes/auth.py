from fastapi import APIRouter
from services.auth_service import create_auth_token

router = APIRouter()

@router.post("/userauth")
def create_auth(username: str, email: str):
  return create_auth_token(username, email)

