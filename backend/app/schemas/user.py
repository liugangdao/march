from pydantic import BaseModel

# 请求结构（用于创建用户）
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    password: str
    class Config:
        from_attributes = True
# schemas.py
class UserIdOnly(BaseModel):
    id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
    class Config:
        from_attributes = True