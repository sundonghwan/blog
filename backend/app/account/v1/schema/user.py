from typing import Optional

from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserBase(BaseModel):
    id: Optional[int]
    email: EmailStr
    username: str
    password: str
    password2: str
    is_active: bool
    is_created_at : Optional[str]

class UserRegister(UserBase):
    pass

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    class Config:
        from_attributes = True
def tokenResponse(token):
    return {"access_token": token}

class UserLoginResponse(BaseModel):
    access_token: str

class ResponseRegister(BaseModel):
    email: EmailStr
    username: str
    is_active: bool

    class Config:
        from_attributes = True