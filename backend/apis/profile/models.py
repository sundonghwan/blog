from database.engine import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship

class Profile(Base):
    __tablename__ = "profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, index=True, nullable=False)
    bio = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)

    # Profile이 속한 User
    user = relationship("User", back_populates="profile")
    # Profile의 타임라인 이벤트 목록
    timeline = relationship("Profile_timeline", back_populates="profile")
    # Profile의 스킬 목록
    skills = relationship("Profile_skills", back_populates="profile")
    # [개선] Integer -> Boolean (의미가 명확함)
    is_public = Column(Boolean, default=True)

class Profile_skills(Base):
    __tablename__ = "profile_skills"
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)
    skill_name = Column(String, nullable=False)
    category = Column(String, nullable=True)

    profile = relationship("Profile", back_populates="skills")

class Profile_timeline(Base):
    __tablename__ = "profile_timeline"
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profiles.id"), nullable=False)
    event_title = Column(String, nullable=False)
    event_description = Column(String, nullable=True)
    event_date = Column(String, nullable=False)

    profile = relationship("Profile", back_populates="timeline")
