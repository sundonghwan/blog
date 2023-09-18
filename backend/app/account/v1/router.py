from datetime import datetime
from fastapi import status, HTTPException, APIRouter, Depends, Query
from sqlalchemy.exc import SQLAlchemyError

from app.account.v1.contorller.user import sign_jwt
from app.account.v1.models.user import User
from app.account.v1.schema.user import UserLogin
from common.verify import get_hashed_password, verfiy_password