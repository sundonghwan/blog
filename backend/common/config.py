import os
from dotenv import load_dotenv


load_dotenv()

class Settings:
    # Database 설정
    DATABASE_HOST: str = os.getenv("DATABASE_HOST")
    DATABASE_PORT: int = os.getenv("DATABASE_PORT")
    DATABASE_NAME: int = os.getenv("DATABASE_NAME")
    DATABASE_USER: int = os.getenv("DATABASE_USER")
    DATABASE_PASSWORD: int = os.getenv("DATABASE_PASSWORD")
    POSTGRESQL_DATABASE_URL = f"postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
    

settings = Settings()

print(settings.DATABASE_HOST)
print(settings.DATABASE_PORT)
print(settings.DATABASE_NAME)
print(settings.DATABASE_USER)
print(settings.DATABASE_PASSWORD)
print(settings.POSTGRESQL_DATABASE_URL)