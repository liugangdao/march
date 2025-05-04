from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models import user as user_model
from app.schemas import user as user_schema

def create_user(db: Session, user: user_schema.UserCreate):
    # 检查用户名是否存在
    existing_user = db.query(user_model.User).filter(user_model.User.name == user.name).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="用户名已存在")

    # 如果不存在，就创建
    db_user = user_model.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()
