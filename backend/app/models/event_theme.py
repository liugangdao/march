from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class EventTheme(Base):
    __tablename__ = "event_themes"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=True)
    title = Column(String, nullable=True)
    rating = Column(Float, nullable=True)
    description = Column(String, nullable=True)
