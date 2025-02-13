from fastapi import APIRouter, Depends, Query
from db.database import database
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from models.user_model import UserIdentifier
from services.auth_service import token_check

router = APIRouter()

router = APIRouter()

@router.get("/get-dreams")
async def fetch_dreams(userid: int = Query(...), userauth: dict = Depends(token_check)):
  print(userid)
  query = "SELECT entryid, title, image_url, sentiment, created_at FROM entries WHERE userid = :userid"
  try:
    rows = await database.fetch_all(query, {"userid": userid})
    
    dreams = [
      {**dict(row), "created_at": row["created_at"].isoformat()}
      for row in rows
    ]
    return JSONResponse(content={
        "message": "Dreams Received!",
        "dreams": dreams,
    })
  except Exception as e:
    print(f"Error: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to retrieve dreams. Please try again.")

@router.get("/get-dream")
async def fetch_dreams(entryid: int = Query(...), userauth: dict = Depends(token_check)):
  query = "SELECT * FROM entries WHERE entryid = :entryid"
  try:
    rows = await database.fetch_all(query, {"entryid": entryid})
    
    dream = [
      {**dict(row), "created_at": row["created_at"].isoformat()}
      for row in rows
    ]
    return JSONResponse(content={
        "message": "Dream Received!",
        "dream": dream[0],
    })
  except Exception as e:
    print(f"Error: {str(e)}")
    raise HTTPException(status_code=500, detail="Failed to retrieve dreams. Please try again.")
