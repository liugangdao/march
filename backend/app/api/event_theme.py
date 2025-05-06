from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.schemas.event_theme import EventThemeSchema
from app.schemas.event_theme import EventThemeSchema, EventThemeCreate
from app.crud import event_theme as crud
from app.database import get_db
from typing import List

router = APIRouter()

@router.get("/themes", response_model=List[EventThemeSchema])
def read_themes(db: Session = Depends(get_db)):
    return crud.get_all_themes(db)
@router.post("/themes", response_model=EventThemeSchema)
def create_theme(theme: EventThemeCreate, db: Session = Depends(get_db)):
    return crud.create_theme(db, theme)