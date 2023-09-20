from datetime import datetime
from fastapi import status, HTTPException, APIRouter, Depends, Query
from sqlalchemy.exc import SQLAlchemyError

from app.account.v1.contorller.user import sign_jwt
from app.account.v1.models.user import User
from app.account.v1.schema.user import UserLogin, ResponseRegister, UserRegister
from common.verify import get_hashed_password, verfiy_password

from database.setting import sessionLocal

db = sessionLocal()

router = APIRouter(prefix="/account", tags=["사용자 관련 API"])

@router.post("/login")
async def login(login: UserLogin):
    try:
        dbUser = db.query(User).filter(User.email==login.email).first()

        if dbUser is not None:
            is_password_valid = verfiy_password(login.password, dbUser.password)
            if is_password_valid:
                token = sign_jwt(dbUser)
                return token
            else:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="You have entered a wrong password"
                )
        else:
            raise HTTPException(
                status_code=status.HTTP_404_FORBIDDEN,
                detail="Not Found User"
            )
    except SQLAlchemyError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Not Found User")
@router.post("/signup/", response_model=ResponseRegister ,description="유저 회원가입")
async def createUser(user: UserRegister):
    try:
        hashed_password = get_hashed_password(user.password)
        if verfiy_password(user.password2, hashed_password):
            pass
        else:
            raise HTTPException(status_code=400, detail="Check Validation password")

        register_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        registerUser = User(
            username=user.username,
            email=user.email,
            password=hashed_password,
            password2=hashed_password,
            is_active=user.is_active,
            is_created_at=register_time
        )
        db_item = db.query(User).filter(User.email==registerUser.email).first()

        if db_item is not None:
            raise HTTPException(status_code=400, detail="User with the email already exists")

        db.add(registerUser)
        db.commit()
        return registerUser

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="An Error occurred while creating the user")

