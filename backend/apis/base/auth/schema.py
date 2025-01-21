from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


class User(BaseModel):
    username: EmailStr
    password: str

class UserRegister(User):
    user_id: str
    password2:str
    created_at: Optional['datetime'] =None
    class Config:
        orm_mode = True

class UserRegisterResponse(BaseModel):
    user_id: str
    email: EmailStr
    success: bool
    message: str

class UserLogin(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str