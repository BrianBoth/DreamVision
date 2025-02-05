from datetime import date
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from db.database import database

async def store_dream(userid, image_url, dream_description, sentiment):
  current_day = date.today()
  query = 'INSERT INTO entries (userid, text, image_url, created_at, sentiment) VALUES (:userid, :text, :image_url, :created_at, :sentiment) RETURNING *'
  try:
    row = await database.execute(query, {"userid": userid, "text": dream_description, "image_url": image_url, "created_at": current_day, "sentiment": sentiment})
    return JSONResponse(content={
      "message": "Dream Uploaded!",
      "dream_content": dict(row),
    })
  except Exception as e:
    raise HTTPException(status_code=500, detail="Failed to store dream. Please try again.")