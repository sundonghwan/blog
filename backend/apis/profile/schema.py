from pydantic import BaseModel
from typing import Optional


# ===== Skill Schemas =====

class SkillCreate(BaseModel):
    """기술 스택 생성"""
    skill_name: str
    category: Optional[str] = None


class SkillResponse(BaseModel):
    """기술 스택 조회"""
    id: int
    skill_name: str
    category: Optional[str]

    class Config:
        from_attributes = True


# ===== Timeline Schemas =====

class TimelineCreate(BaseModel):
    """타임라인 생성"""
    event_title: str
    event_description: Optional[str] = None
    event_date: str  # "2024", "2024-01" 형식


class TimelineResponse(BaseModel):
    """타임라인 조회"""
    id: int
    event_title: str
    event_description: Optional[str]
    event_date: str

    class Config:
        from_attributes = True


# ===== Profile Schemas =====

class ProfileCreate(BaseModel):
    """프로필 생성"""
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    is_public: bool = True


class ProfileUpdate(BaseModel):
    """프로필 수정"""
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    is_public: Optional[bool] = None


class ProfileResponse(BaseModel):
    """프로필 조회"""
    id: int
    user_id: int
    bio: Optional[str]
    avatar_url: Optional[str]
    is_public: bool
    skills: list[SkillResponse] = []
    timeline: list[TimelineResponse] = []

    class Config:
        from_attributes = True
