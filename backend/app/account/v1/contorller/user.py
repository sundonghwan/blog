import time
import jwt


from common.config import settings
from app.account.v1.schema import user
def expiration_time():
    expiration_time = time.time() + (16 * 60 * 60) # 16시간 뒤
    return expiration_time

def sign_jwt(users: user.UserLogin):
    payload = {
        "email": users.email,
        "expries": expiration_time()
    }
    token = jwt.encode(payload, settings.SECRETKEY, settings.ALGORITHM)
    return user.tokenResponse(token=token)

def decode_jwt(token: str):
    try:
        decodeToken = jwt.decode(token, settings.SECRETKEY, algorithms=settings.ALGORITHM)
        return decodeToken if decodeToken["expires"] >= time.time() else {}
    except:
        return {}

