from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from common.config import settings

DATABASE_URL = f"postgresql://{settings.DATABASE_ID}:" \
               f"{settings.DATABASE_PW}@" \
               f"{settings.DATABASE_HOST}:" \
               f"{settings.DATABASE_PORT}/" \
               f"{settings.DATABASE_NAME}"

engine = create_engine(DATABASE_URL, echo=False)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = None
    try:
        db = sessionLocal()
        yield db
    finally:
        db.close()