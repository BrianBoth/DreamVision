import jwt
import os
from fastapi import HTTPException
from datetime import datetime, timedelta, timezone
import bcrypt
from db.database import database

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

def create_auth_token(username: str, email: str):
    expiration_time = datetime.now(timezone.utc) + timedelta(hours=1)
    payload = {
        "username": username,
        "email": email,
        "exp": expiration_time,
    }
    access_token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"access_token": access_token, "token_type": "bearer"}

def token_check(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def hash_password(password: str) -> str:
  salt = bcrypt.gensalt()
  hashed = bcrypt.hashpw(password.encode(), salt)
  return hashed.decode()

def check_password(password: str, hashed_password: str) -> bool:
  return bcrypt.checkpw(password.encode(), hashed_password.encode())

async def get_hash_password(email: str):
  query = "SELECT * FROM users WHERE email = :email"
  result = await database.fetch_one(query, {"email": email})
  if result:
    auth_token = create_auth_token(result["username"], email)["access_token"]
    return {"userid": result["userid"], "username": result["username"], "password": result["password"], "token": auth_token}
  else:
    return None
