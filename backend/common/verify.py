from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hashed_password(password: str):
    return password_context.hash(password)

def verfiy_password(password: str, hashed_password: str):
    return password_context.verify(password, hashed_password)
