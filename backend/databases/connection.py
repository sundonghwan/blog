from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from common.config import settings

class Database:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.session = sessionmaker(autoflush=False, autocommit=False, bind=self.engine)
        self.Base = declarative_base()

    def get_db(self):
        db = self.session()
        try:
            yield db
        finally:
            db.close()


postgres_db = Database(settings.POSTGRESQL_DATABASE_URL)