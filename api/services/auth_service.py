import jwt
import os
from fastapi import HTTPException
from datetime import datetime, timedelta

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"

def create_auth_token(username: str, email: str):
    user = {"username": username, "email": email}
    accessToken = jwt.encode(user, JWT_SECRET, algorithm=JWT_ALGORITHM, expires_delta=timedelta(hours=1))
    return {"access_token": accessToken, "token_type": "bearer"}

def get_current_user(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
