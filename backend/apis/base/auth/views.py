from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from apis.base.auth.schema import UserRegister, User
from apis.base.auth.controller import UserController, UserRegisterResponse, JWTService, verify_login_password, UserLogin
from databases.connection import postgres_db
from common.config import settings
auth_router = APIRouter(prefix="/user")
@auth_router.post("/register", response_model=UserRegisterResponse)
async def user_register(request: UserRegister, db:Session = Depends(postgres_db.get_db)):
    controller = UserController(db)
    result, text = await controller.register(request)

    return {"success": result, "email": request.email, "user_id": request.user_id, "message": text}

@auth_router.post("/token", response_model=UserLogin)
async def login_for_access_token(users: User, db:Session = Depends(postgres_db.get_db)):
    controller = UserController(db)
    user = await controller.search(users)
    if not user or not verify_login_password(user.password, users.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect user or password", 
            headers={"WWW-Authenticate": "Bearer"},
            )
    jwt_service = JWTService(
        algorithm=settings.JWT_ALGORITHM,
        secret_key=settings.JWT_SECRET,
        access_token_expire_time=timedelta(minutes=settings.JWT_ACCESS_TOKEN_TIME),
        refresh_token_expire_time=timedelta(hours=settings.JWT_REFRESH_TOKEN_TIME)
    )
    access_token = jwt_service.create_access_token(data={"sub": users.email})
    refresh_token = jwt_service.create_refresh_token(data={"sub": users.email})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}