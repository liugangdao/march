from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.schemas.event_theme import EventThemeSchema
from app.schemas.event_theme import EventThemeSchema, EventThemeCreate,EventSlotCreate
from app.schemas.event_theme import ParticipationCreate  # ✅ 来自正确 schema 文件



from app.crud import event_theme as crud
from app.database import get_db
from app .auth import get_current_user
from typing import List

router = APIRouter()

@router.get("/themes", response_model=List[EventThemeSchema])
def read_themes(db: Session = Depends(get_db)):
    return crud.get_all_themes(db)
@router.post("/themes", response_model=EventThemeSchema)
def create_theme(theme: EventThemeCreate, db: Session = Depends(get_db)):
    return crud.create_theme(db, theme)
@router.get("/themes/{theme_id}", response_model=EventThemeSchema)
def read_theme(theme_id: int, db: Session = Depends(get_db)):
    return crud.get_theme(db, theme_id)

@router.post("/slots")
def create_slot(slot: EventSlotCreate, db: Session = Depends(get_db)):
    return crud.create_slot(db, slot)

@router.post("/participation")
def create_participation(participation:ParticipationCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)):
    print("✅ 使用的 ParticipationCreate 来自：", ParticipationCreate.__module__)
    print("📥 收到数据：", participation)
    return crud.create_participation(db, participation, current_user_id)