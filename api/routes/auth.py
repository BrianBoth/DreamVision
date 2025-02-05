from fastapi import APIRouter
import services.auth_service as auth
from db.database import database
from models.user_model import UserSignup, User
from fastapi import HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/login")
async def user_login(user: User):
  user_data = await auth.get_hash_password(user.email)

  if not user_data:
    raise HTTPException(status_code=404, detail="User not found")
  
  hashed_pass = user_data["password"]
  pass_verification = auth.check_password(user.password, hashed_pass)

  if not pass_verification:
    raise HTTPException(status_code=401, detail="Invalid password")

  response = JSONResponse(content={
    "message": "Login successful",
    "userid": user_data["userid"],
  })

  print(user_data["token"])
  response.set_cookie(key="access_token", value=user_data["token"], httponly=True, secure=True, samesite="Lax")
  return response

@router.post("/signup")
async def user_signup(user: UserSignup):
  hashed_pass = auth.hash_password(user.password)
  query = 'INSERT INTO users (username, email, password) VALUES (:username, :email, :password)'
  await database.execute(query, {"username": user.username, "email": user.email, "password": hashed_pass})
  auth_token = auth.create_auth_token(user.username, user.email)["access_token"]
  query = 'SELECT userid FROM users WHERE email = :email'
  response_query = await database.fetch_one(query, {'email': user.email})

  response = JSONResponse(content={
    "message": "Login successful",
    "userid": response_query['userid'],
  })

  response.set_cookie(key="access_token", value=auth_token, httponly=True, secure=True, samesite="Lax")
  return response
