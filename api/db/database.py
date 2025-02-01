from databases import Database
import os
from dotenv import load_dotenv

load_dotenv()

database = Database(os.getenv("DATABASE_URL"))

async def connect_db():
    await database.connect()

async def disconnect_db():
    await database.disconnect()