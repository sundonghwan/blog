from sqlalchemy import Boolean, Column, String, TEXT, Integer, DateTime
from database.setting import Base
class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    password2 = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=False)
    is_created_at = Column(String(255), nullable=False)
    is_updated_at = Column(String(255), nullable=True)
