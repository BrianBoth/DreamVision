from datetime import date
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from db.database import database

async def store_dream(userid, image_url, dream_description, sentiment, title):
    current_day = date.today()
    print(userid, image_url, dream_description, sentiment, title, current_day)

    query = '''
        INSERT INTO entries (userid, title, text, sentiment, image_url, created_at)
        VALUES (:userid, :title, :text, :sentiment, :image_url, :created_at)
        RETURNING *
    '''
    try:
        row = await database.fetch_one(query, {
            "userid": userid,
            "title": title,
            "text": dream_description,
            "sentiment": sentiment,
            "image_url": image_url,
            "created_at": current_day  # Keep as date object
        })
        print(dict(row))
        if not row:
            raise HTTPException(status_code=500, detail="Failed to store dream. No data returned.")

        # Convert current_day to string for the JSON response
        row_dict = dict(row)
        row_dict['created_at'] = row_dict['created_at'].isoformat()  # Convert date to string format

        return JSONResponse(content={
            "message": "Dream Uploaded!",
            "dream_content": row_dict,
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to store dream. Please try again.")
