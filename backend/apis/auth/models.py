from database.engine import Base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # User가 쓴 Post 목록
    posts = relationship("Post", back_populates="author")

    # User의 Profile
    profile = relationship("Profile", back_populates="user", uselist=False)

    # User가 만든 Project 목록
    projects = relationship("Project", back_populates="owner")
    
    # [개선] Integer -> Boolean (의미가 명확함)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)