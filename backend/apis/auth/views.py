from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.engine import get_db
from apis.auth.schema import UserCreate, UserResponse, UserLogin, UserLoginResponse, RefreshTokenRequest
from apis.auth.controller import AuthController
from common.utils import JWTHandler
router = APIRouter(prefix="/auth", tags=["Auth"])  # noqa: F401

@router.post("/login", response_model=UserLoginResponse)
async def login(requests: UserLogin, controller: AuthController = Depends()):
    response = controller.login_user(requests.email, requests.password)
    if not response:
        return {"message": "Invalid credentials"}
    return response

@router.post("/logout")
async def logout(token: str = Depends(JWTHandler.verify_token)):
    return {"message": "Logout successful"}

@router.post("/me")
async def get_current_user(token: str = Depends(JWTHandler.verify_token)):
    return {"message": "Current user data"}

@router.post("/refresh")
async def refresh_token(requests: RefreshTokenRequest, controller: AuthController = Depends()):
    return controller.refresh_user_token(requests.refresh_token)

@router.post("/register", response_model=UserResponse)
async def register(requests: UserCreate, controller: AuthController = Depends()):
    return controller.create_user(requests)
