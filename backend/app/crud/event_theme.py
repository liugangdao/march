from sqlalchemy.orm import Session
from app.schemas.event_theme import EventThemeCreate
from app.models.event_theme import EventTheme
from app.schemas.event_theme import EventSlotCreate,ParticipationCreate
from app.models.event_theme import EventSlot,Participation
from fastapi import HTTPException
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


# crud.py
def create_participation(db: Session, participation: ParticipationCreate, user_id: int):
    slot = db.query(EventSlot).filter(EventSlot.id == participation.slot_id).first()
    if not slot:
        raise HTTPException(status_code=404, detail="时间段不存在")

    new_part = Participation(
        slot_id=participation.slot_id,
        name=participation.name,
        email=participation.email,
        user_id=user_id
    )
    db.add(new_part)
    db.commit()
    db.refresh(new_part)
    return new_part
