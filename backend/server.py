from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

ALLOWED_COLORS = ["rose", "lavender", "gold", "mulberry"]

SEED_WISHES = [
    {
        "name": "Your Best Friend",
        "tag": "Bestie",
        "message": "Happy Birthday, Parul! May this year bring you every dream you have been quietly chasing. You deserve the whole sky.",
        "color": "rose",
    },
    {
        "name": "A Secret Admirer",
        "tag": "Well-wisher",
        "message": "Wishing you a September 26 as radiant as your smile. Keep shining, keep laughing, keep being wonderfully you.",
        "color": "lavender",
    },
]


class Wish(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=60)
    tag: str = Field(default="", max_length=40)
    message: str = Field(min_length=1, max_length=500)
    color: str = "rose"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WishCreate(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    tag: str = Field(default="", max_length=40)
    message: str = Field(min_length=1, max_length=500)
    color: str = "rose"


@api_router.get("/")
async def root():
    return {"message": "Parul's Birthday API"}


@api_router.post("/wishes", response_model=Wish)
async def create_wish(input: WishCreate):
    if input.color not in ALLOWED_COLORS:
        raise HTTPException(status_code=422, detail="Invalid color")
    wish = Wish(**input.model_dump())
    doc = wish.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.wishes.insert_one(doc)
    return wish


@api_router.get("/wishes", response_model=List[Wish])
async def get_wishes():
    wishes = await db.wishes.find({}, {"_id": 0}).sort("timestamp", -1).to_list(200)
    for w in wishes:
        if isinstance(w.get("timestamp"), str):
            w["timestamp"] = datetime.fromisoformat(w["timestamp"])
    return wishes


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_wishes():
    count = await db.wishes.count_documents({})
    if count == 0:
        now = datetime.now(timezone.utc).isoformat()
        docs = [
            {**w, "id": str(uuid.uuid4()), "timestamp": now}
            for w in SEED_WISHES
        ]
        await db.wishes.insert_many(docs)
        logger.info("Seeded starter birthday wishes")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
