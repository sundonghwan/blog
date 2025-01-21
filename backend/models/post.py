from sqlalchemy import Column, Integer, String, TIMESTAMP
from databases.connection import postgres_db

Base = postgres_db.Base

class Post(Base):
    __tablename__ = "post"
    id = Column(Integer, autoincrement=True, index=True, primary_key=True)
    title = Column(String(255), nullable=False)
    contents = Column(String(20000), nullable=False)
    author = Column(String(255), nullable=False)
    updated_at = Column(TIMESTAMP, nullable=False)
    created_at = Column(TIMESTAMP, nullable=False)