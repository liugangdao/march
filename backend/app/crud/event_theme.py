from sqlalchemy.orm import Session
from app.schemas.event_theme import EventThemeCreate
from app.models.event_theme import EventTheme
from app.schemas.event_theme import EventSlotCreate
from app.models.event_theme import EventSlot
def get_all_themes(db: Session):
    return db.query(EventTheme).all()

def create_theme(db: Session, theme: EventThemeCreate):
    db_theme = EventTheme(**theme.dict())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme

def get_theme(db: Session, theme_id: int):
    return db.query(EventTheme).filter(EventTheme.id == theme_id).first()

# crud/event_theme.py

def create_slot(db: Session, slot: EventSlotCreate):
    db_slot = EventSlot(**slot.dict())
    db.add(db_slot)
    db.commit()
    db.refresh(db_slot)
    return db_slot
