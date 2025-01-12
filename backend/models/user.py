from sqlalchemy import Column, Integer, String, TIMESTAMP
from databases.connection import postgres_db

class User(postgres_db.Base):
    __table_name__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    password2 = Column(String(255), nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)