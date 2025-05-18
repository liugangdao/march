from sqlalchemy.orm import Session
from app.schemas.event_theme import EventThemeCreate
from app.models.event_theme import EventTheme
from app import models

def get_all_themes(db: Session):
    return db.query(EventTheme).all()

def create_theme(db: Session, theme: EventThemeCreate):
    db_theme = EventTheme(**theme.dict())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme

def get_theme(db: Session, theme_id: int):
    return db.query(models.EventTheme).filter(models.EventTheme.id == theme_id).first()
