from datetime import datetime
from fastapi import status, HTTPException, APIRouter, Depends, Query
from sqlalchemy.exc import SQLAlchemyError

from app.account.v1.contorller.user import sign_jwt
from app.account.v1.models.user import User
from app.account.v1.schema.user import UserLogin
from common.verify import get_hashed_password, verfiy_password

from database.setting import sessionLocal

db = sessionLocal

router = APIRouter()

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
