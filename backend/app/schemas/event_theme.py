from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class EventThemeCreate(BaseModel):
    title: str
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None

class EventThemeSchema(EventThemeCreate):
    id: int

    class Config:
        orm_mode = True
class EventSlotCreate(BaseModel):
    theme_id: int
    date: date
    time: time
    max_people: int