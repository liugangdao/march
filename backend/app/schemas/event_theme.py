from pydantic import BaseModel
from typing import Optional, List
from datetime import date, time


class SlotSchema(BaseModel):
    id: int
    date: date
    time: time
    max_people: int  # ⚠️ 确保与你数据库字段一致

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
    slots: List[SlotSchema] = []  # ✅ 添加 slots 详情

    class Config:
        orm_mode = True


class EventSlotCreate(BaseModel):
    theme_id: int
    date: date
    time: time
    max_people: int  # ⚠️ 一定要和 models 里字段一致
