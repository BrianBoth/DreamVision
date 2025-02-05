from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from db.database import connect_db, disconnect_db
from routes import dream_generation
from routes import auth
from routes import display

pool = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    print("connected to db")
    yield
    await disconnect_db()
    print("disconnected from db")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes from the routes directory
app.include_router(dream_generation.router)
app.include_router(auth.router)
app.include_router(display.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Dream Journal API!"}

