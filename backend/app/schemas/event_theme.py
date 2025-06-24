from pydantic import BaseModel
from datetime import date, time
from typing import Optional, List
import datetime

# get 
class SlotSchema(BaseModel):
    id:int
    date: date
    time: time
    max_people: int 
    class Config:
        orm_mode = True


class EventThemeCreate(BaseModel):
    title: str
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None


class EventThemeSchema(BaseModel):
    id: int
    title: str
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    slots: List[SlotSchema] = [] 

    class Config:
        orm_mode = True

class themeUpdate(BaseModel):
    title: Optional[str] = None
    image_url: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None

class EventSlotCreate(BaseModel):
    theme_id: int
    date: date
    time: time
    max_people: int  

class SlotUpdate(BaseModel):
    date: Optional[datetime.date] = None
    time: Optional[datetime.time] = None
    max_people: Optional[int] = None

class AdminSlotCardSchema(BaseModel):
    slotid: Optional[int] = None
    themeid: Optional[int] = None  
    date: Optional[datetime.date] = None
    time: Optional[datetime.time] = None
    maxpeople: Optional[int] = None
    name: Optional[str] = None
    imageUrl: Optional[str]

    class Config:
        orm_mode = True

class ParticipationCreate(BaseModel):
    slot_id :int
    name : str
    email :str

class BookingInfoSchema(BaseModel):
    slot_id: int
    theme_title: str
    date: date
    time: time
    max_people: int
    booked_people: int
    remaining: int
    user_name: str
    user_email: str