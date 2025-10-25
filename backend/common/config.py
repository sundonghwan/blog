import os
from dotenv import load_dotenv

load_dotenv()  # .env 파일 로드

class DevConfig:
    DEBUG = True
    DATABASE_URL = os.getenv("DATABASE_URL")
    ACCESS_EXPIRE_MINUTES = int(os.getenv("EXPIRE_MINUTES", 10))  # 10분
    SECRET_KEY = os.getenv("SECRET_KEY")
    REFRESH_EXPIRE_MINUTES = int(os.getenv("REFRESH_EXPIRE_MINUTES", 60))
    ALGORITHM = os.getenv("ALGORITHM", "HS256")

class ProdConfig:
    DEBUG = False
    DATABASE_URL = os.getenv("DATABASE_URL")
    ACCESS_EXPIRE_MINUTES = int(os.getenv("EXPIRE_MINUTES", 10))
    SECRET_KEY = os.getenv("SECRET_KEY")
    REFRESH_EXPIRE_MINUTES = int(os.getenv("REFRESH_EXPIRE_MINUTES", 60))
    ALGORITHM = os.getenv("ALGORITHM", "HS256")

if os.getenv("ENV") == "PROD":
    settings = ProdConfig()
else:
    settings = DevConfig()