from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, Depends
from apis.auth import models, schema
from apis.auth.schema import UserResponse, UserLoginResponse
from common.utils import JWTHandler
from common.config import settings
from database.engine import get_db


class AuthController:
    def __init__(self, db: Session=Depends(get_db)):
        self.db = db

    def get_user_by_email(self, email: str):
        return self.db.query(models.User).filter(models.User.email == email).first()

    def get_user_by_username(self, username: str):
        """username으로 User 조회"""
        return self.db.query(models.User).filter(models.User.username == username).first()


    def get_user_by_id(self, user_id: int):
        """ID로 User 조회"""
        return self.db.query(models.User).filter(models.User.id == user_id).first()

    def get_access_token(self, email: str):
        """Access Token 생성"""
        access_token = JWTHandler.create_access_token(
            email=email,
            secret_key=settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
        )
        return access_token

    def get_refresh_token(self, email: str):
        """Refresh Token 생성"""
        refresh_token = JWTHandler.create_refresh_token(
            email=email,
            secret_key=settings.SECRET_KEY,
            algorithm=settings.ALGORITHM
        )
        return refresh_token

    def create_user(self, user_create: schema.UserCreate):
        """User creation - Step 1"""

        # 1. Check if email already exists
        if self.get_user_by_email(user_create.email):
            raise HTTPException(status_code=400, detail="Email already registered")

        # 2. Check if username already exists
        if self.get_user_by_username(user_create.username):
            raise HTTPException(status_code=400, detail="Username already taken")

        # 3. Hash the password
        hashed_password = JWTHandler.create_password_hash(user_create.password)

        # 4. User 객체 생성
        db_user = models.User(
            username=user_create.username,
            email=user_create.email,
            hashed_password=hashed_password,
            is_active=True,
            is_superuser=False
        )

        # 5. DB에 추가
        try:
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            return db_user

        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="User creation failed")


    def authenticate_user(self, email: str, password: str):
        """User 인증 (비밀번호 검증만 수행)"""

        # 1. Get user by email
        user = self.get_user_by_email(email)
        if not user:
            return None

        # 2. Verify password
        if not JWTHandler.verify_password(password, user.hashed_password):
            return None

        # 3. Check if user is active
        if not user.is_active:
            return None

        return user


    def login_user(self, email: str, password: str):
        """로그인 처리 (인증 + 토큰 생성)"""

        # 1. 사용자 인증
        user = self.authenticate_user(email, password)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")

        # 2. 토큰 생성
        access_token = self.get_access_token(user.email)
        refresh_token = self.get_refresh_token(user.email)

        return UserLoginResponse(access_token=access_token, refresh_token=refresh_token)

    def refresh_user_token(self, refresh_token: str):
        """토큰 리프레시 처리"""

        # 1. Refresh Token 검증
        payload = JWTHandler.verify_refresh_token(
            token=refresh_token,
            secret_key=settings.SECRET_KEY,
            algorithms=settings.ALGORITHM
        )
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid refresh token payload")

        # 2. 새로운 Access Token 생성
        new_access_token = self.get_access_token(email)

        return UserLoginResponse(access_token=new_access_token, refresh_token=refresh_token)