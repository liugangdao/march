from pydantic import BaseModel
from typing import Optional

class EventThemeCreate(BaseModel):
    title: str
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None

class EventThemeSchema(EventThemeCreate):
    id: int

    class Config:
        orm_mode = True
