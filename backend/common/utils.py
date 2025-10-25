from typing import Optional
from passlib.context import CryptContext
from jose import JWTError, ExpiredSignatureError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from common.config import settings

# HTTPBearer 인스턴스 (한 번만 생성)
security = HTTPBearer()

class JWTHandler:
    # 클래스 변수로 한 번만 생성 (성능 개선)
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # ===== 비밀번호 관련 =====

    @staticmethod
    def create_password_hash(password: str) -> str:
        """비밀번호 해싱"""
        print("Hashing password...", password, "Length:", len(password))

        # bcrypt는 72바이트 제한이 있음
        if len(password) > 72:
            raise ValueError("Password is too long (max 72 characters)")

        return JWTHandler.pwd_context.hash(password)

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """비밀번호 검증"""
        return JWTHandler.pwd_context.verify(plain_password, hashed_password)

    # ===== JWT 토큰 관련 =====

    @staticmethod
    def encode(payload: dict, secret_key: str = settings.SECRET_KEY, algorithm: str = settings.ALGORITHM, expires_delta: timedelta = None) -> str:
        """JWT 토큰 생성 (만료 시간 포함)"""
        to_encode = payload.copy()

        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(hours=1)  # 기본 1시간

        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, secret_key, algorithm=algorithm)

    @staticmethod
    def decode(token: str, secret_key: str = settings.SECRET_KEY, algorithms: str = settings.ALGORITHM) -> dict:
        """JWT 토큰 디코드 (만료/유효성 검증)"""
        try:
            payload = jwt.decode(token, secret_key, algorithms=algorithms)
            return payload
        except ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")

    @staticmethod
    def is_token_valid(token: str, secret_key: str = settings.SECRET_KEY, algorithms: list = settings.ALGORITHM) -> bool:
        """토큰 유효성 확인 (True/False만 반환)"""
        try:
            jwt.decode(token, secret_key, algorithms=algorithms)
            return True
        except JWTError:
            return False

    # ===== 편의 메서드 =====

    @staticmethod
    def create_access_token(email: str, secret_key: str = settings.SECRET_KEY, algorithm: str = settings.ALGORITHM) -> str:
        """Access Token 생성 (1시간)"""
        payload = {"email": email, "type": "access"}
        return JWTHandler.encode(payload, secret_key, algorithm, expires_delta=timedelta(hours=settings.ACCESS_EXPIRE_MINUTES))

    @staticmethod
    def create_refresh_token(email: str, secret_key: str = settings.SECRET_KEY, algorithm: str = settings.ALGORITHM) -> str:
        """Refresh Token 생성 (7일)"""
        payload = {"email": email, "type": "refresh"}
        return JWTHandler.encode(payload, secret_key, algorithm, expires_delta=timedelta(minutes=settings.REFRESH_EXPIRE_MINUTES))

    # ===== 토큰 검증 =====
    @staticmethod
    def verify_access_token(token: str, secret_key: str = settings.SECRET_KEY, algorithms: str = settings.ALGORITHM) -> dict:
        """Access Token 검증"""
        payload = JWTHandler.decode(token, secret_key, algorithms)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid access token")
        return payload
    
    @staticmethod
    def verify_refresh_token(token: str, secret_key: str = settings.SECRET_KEY, algorithms: str = settings.ALGORITHM) -> dict:
        """Refresh Token 검증"""
        payload = JWTHandler.decode(token, secret_key, algorithms)
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        return payload

    # ===== 의존성 주입 함수 (클래스 밖) =====
    @staticmethod
    def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
        """
        Authorization 헤더에서 토큰 검증 후 email 반환 (의존성 주입용)

        Usage:
            from common.utils import verify_token

            @router.get("/me")
            def get_me(email: str = Depends(verify_token), db: Session = Depends(get_db)):
                user = get_user_by_email(db, email)
                return user
        """
        token = credentials.credentials
        payload = JWTHandler.verify_access_token(token)

        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        return email

    @staticmethod
    def verify_token_optional(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> Optional[str]:
        """
        Authorization 헤더에서 토큰 검증 후 email 반환 (의존성 주입용)

        Usage:
            from common.utils import verify_token

            @router.get("/me")
            def get_me(email: str = Depends(verify_token), db: Session = Depends(get_db)):
                user = get_user_by_email(db, email)
                return user
        """
        token = credentials.credentials
        payload = JWTHandler.verify_access_token(token)

        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        return email
