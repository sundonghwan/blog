import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, BaseModel

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='dev.env', env_file_encoding='utf-8')
    SECRETKEY: str = "SECRETKEY"
    ALGORITHM: str = "ALGORITHM"
    ACCESS_TOKEN_EXPIRE_MINUTES: str = "ACCESS_TOKEN_EXPIRE_MINUTES"
    APP_NAME: str = "APP_NAME"
    ADMIN_EMAIL: str = "ADMIN_EMAIL"
    DATABASE_HOST: str = "DATABASE_HOST"
    DATABASE_PORT: str = "DATABASE_PORT"
    DATABASE_NAME: str = "DATABASE_NAME"
    DATABASE_ID: str = "DATABASE_ID"
    DATABASE_PW: str = "DATABASE_PW"

class SettingsFactory:
    @staticmethod
    def load(types):
        env_state = os.getenv("ENV_STATE")
        if env_state == None:
            env_state = types
        if env_state == "dev":
            return Settings()
        if env_state == "prod":
            return Settings()

settings = SettingsFactory.load(types="dev")


