from pydantic import BaseModel

# 请求结构（用于创建用户）
class UserCreate(BaseModel):
    name: str
    email: str

# 响应结构（用于返回用户数据）
class UserOut(UserCreate):
    id: int

    class Config:
        from_attributes = True
