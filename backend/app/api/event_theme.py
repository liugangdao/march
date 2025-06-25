from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.schemas.event_theme import EventThemeSchema
from app.schemas.event_theme import EventThemeSchema, EventThemeCreate,EventSlotCreate,SlotUpdate,SlotSchema,AdminSlotCardSchema,themeUpdate,BookingInfoSchema
from app.schemas.event_theme import ParticipationCreate  



from app.crud import event_theme as crud
from app.database import get_db
from app .auth import get_current_user
from typing import List

router = APIRouter()

@router.get("/themes", response_model=List[EventThemeSchema])
def read_themes(db: Session = Depends(get_db)):
    return crud.get_all_themes(db)

@router.get("/themes/{theme_id}", response_model=EventThemeSchema)
def read_theme(theme_id: int, db: Session = Depends(get_db)):
    return crud.get_theme(db, theme_id)

@router.post("/themes", response_model=EventThemeSchema)
def create_theme(theme: EventThemeCreate, db: Session = Depends(get_db)):
    return crud.create_theme(db, theme)


@router.delete("/themes/{theme_id}")
def delete_theme(theme_id :int, db:Session = Depends(get_db)):
    print('sucussful request API')
    return crud.delete_theme(db,theme_id)

@router.put("/themes/{theme_id}",response_model=EventThemeCreate)
def update_theme(theme_id:int, theme: themeUpdate, db:Session = Depends(get_db)):
    return crud.update_theme(db,theme_id,theme)
    
# @router.put("/slots/{slot_id}",response_model=SlotSchema)
# def update_slot(slot_id: int, slot: SlotUpdate, db: Session = Depends(get_db)):
#     return crud.update_slot(db,slot_id,slot)

@router.post("/slots",response_model=EventSlotCreate)
def create_slot(slot: EventSlotCreate, db: Session = Depends(get_db)):
    return crud.create_slot(db, slot)

@router.get("/slots",response_model=List[SlotSchema])
def get_participation(db:Session = Depends(get_db)):
    return crud.get_slots(db)

@router.get("/slots/{slot_id}", response_model=SlotSchema)
def get_slot(slot_id: int, db: Session = Depends(get_db)):
    return crud.get_slot(db,slot_id)

@router.put("/slots/{slot_id}",response_model=SlotSchema)
def update_slot(slot_id: int, slot: SlotUpdate, db: Session = Depends(get_db)):
    return crud.update_slot(db,slot_id,slot)

@router.delete("/slots/{slot_id}")
def delete_slot(slot_id: int, db: Session = Depends(get_db)):
    return crud.delete_slot(db,slot_id)

@router.get("/admin/slot", response_model=List[AdminSlotCardSchema])
def get_slot_cards(db: Session = Depends(get_db)):
    return crud.get_slot_cards(db)


@router.post("/participation")
def create_participation(participation:ParticipationCreate,
    current_user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)):
    print("✅ Using ParticipationCreate from：", ParticipationCreate.__module__)
    print("📥 Data Recived：", participation)
    return crud.create_participation(db, participation, current_user_id)

@router.get("/admin/bookings", response_model=List[BookingInfoSchema])
def get_all_bookings(db: Session = Depends(get_db)):
    return crud.get_book_inf(db)

@router.get("/topThemes",response_model=List[EventThemeSchema])
def get_top_Theme(db:Session = Depends(get_db)):
    return crud.get_top_theme(db)