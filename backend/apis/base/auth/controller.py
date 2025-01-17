import re
import bcrypt
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import timedelta
import datetime
import models
from apis.base.auth.schema import *
from databases.connection import postgres_db

def verify_pasword(password, password2):
    if len(password) < 8:
        return False, "비밀번호는 최소 8자리 이상이어야 합니다."
    if not password == password2:
        return False, "비밀번호가 다릅니다."
    has_upper = any(char.isupper() for char in password)
    has_lower = any(char.islower() for char in password)
    has_digit = any(char.isdigit() for char in password)
    has_special = any(char in "!@#$%^&*()-_=+[]{}|;:'\",.<>?/~`" for char in password)

    num_types = sum([has_upper, has_lower, has_digit, has_special])

    if len(password) < 10 and num_types < 2:
        return False, "비밀번호가 10자리 미만인 경우, 두 종류 이상의 문자 조합이 필요합니다."

    if len(password) < 10 and num_types <1:
        return False, "비밀번호가 10자리 이상인 경우, 최소 한 가지 종류의 문자가 들어가야합니다."
    
    if re.search(r"(.)\1{2,}", password):
        return False, "연속된 동일 문자를 포함할 수 없습니다. (예: aaa, 111)"
    
    keyboard_patterns = [
        "qwerty", "asdf", "zxcv", "123456", "abcdef", "7890",
        "poiuy", "lkjh", "mnbvc", "09876"
    ]
    if any(pattern in password.lower() for pattern in keyboard_patterns):
        return False, "키보드 상에서 나란히 있는 문자열을 포함할 수 없습니다. (예: qwerty)"

    common_patterns = [
        "password", "123456", "111111", "000000", "letmein",
        "admin", "welcome", "iloveyou", "sunshine", "qwertyuiop"
    ]
    if password.lower() in common_patterns:
        return False, "비밀번호가 지나치게 단순합니다. (예: password, 123456)"
    
    return True, "비밀번호가 유효합니다."

def hashed_password(password):
    password = password.encode("utf-8")
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password=password, salt=salt)
    return hash_password.decode()

def verify_login_password(password, login_password):
    password_bytes = password.encode("utf-8")
    login_password_bytes = login_password.encode("utf-8")
    return bcrypt.checkpw(login_password_bytes, password_bytes)

class JWTService:
    def __init__(
        self,
        algorithm: str = None,
        secret_key: str = None,
        access_token_expire_time: int = None,
        refresh_token_expire_time: int =None
    ):
        self.algorithm = algorithm
        self.secret_key = secret_key
        self.access_token_expire_time = access_token_expire_time
        self.refresh_token_expire_time = refresh_token_expire_time

    def _encode(self, data: dict, expires_data: int, secret_key: str, algorithm:str):
        to_encode = data.copy()
        expire = datetime.now() + expires_data
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, secret_key, algorithm=algorithm)
    
    def _decode(self, token: str, secret_key: str, algorithm: str):
        try:
            return jwt.decode(token, secret_key, algorithms=algorithm)
        except jwt.ExpiredSignatureError:
            return None  # Token expired
        except jwt.InvalidTokenError:
            return None  # Invalid token
        
    def create_access_token(self, data: dict):
        return self._create_token(data, self.access_token_expire_time)
    
    def create_refresh_token(self, data: dict):
        return self._create_token(data, self.refresh_token_expire_time)
    
    def _create_token(self, data:dict, expires_delta: int):
        return self._encode(data, expires_delta, self.secret_key, self.algorithm)
    
    def check_token_expired(self, token: str):
        payload = self._decode(token, self.secret_key, self.algorithm)
        now = datetime.timestamp(datetime.now())
        if payload and payload["exp"] < now:
            return None
        return payload

class UserController:
    def __init__(self, db):
        self.db = db

    async def register(self, user: UserRegister):
        verify_result, verify_result_text=verify_pasword(user.password, user.password2)
        if not verify_result:
            return verify_result, verify_result_text
        
        password = hashed_password(user.password)
        db_user = models.User(
            user_id=user.user_id,
            email=user.email,
            password=password,
            password2=password,
            created_at=user.created_at
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return True, "회원 가입 완료"
    
    async def search(self, user: User):
        email = user.email
        return self.db.query(models.User).filter(models.User.email==email).first()

