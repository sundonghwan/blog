from pydantic import BaseModel, Field, field_validator
from typing import Any, Optional
from datetime import datetime


# ===== Tech Stack Schemas =====

class TechStackCreate(BaseModel):
    """기술 스택 생성"""
    tech_name: str


class TechStackResponse(BaseModel):
    """기술 스택 조회 응답"""
    id: int
    tech_name: str

    class Config:
        from_attributes = True


# ===== Project Schemas =====

class ProjectCreate(BaseModel):
    """프로젝트 생성"""
    title: str
    description: str
    detail_content: Optional[str] = None
    thumbnail: str
    images: Optional[list[str]] = None
    role: str
    team_size: Optional[int] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    start_date: str
    end_date: Optional[str] = None
    status: str = "in-progress"  # completed, in-progress, archived
    featured: bool = False


class ProjectUpdate(BaseModel):
    """프로젝트 수정"""
    title: Optional[str] = None
    description: Optional[str] = None
    detail_content: Optional[str] = None
    thumbnail: Optional[str] = None
    images: Optional[list[str]] = None
    role: Optional[str] = None
    team_size: Optional[int] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    status: Optional[str] = None
    featured: Optional[bool] = None


class ProjectResponse(BaseModel):
    """프로젝트 조회 응답"""
    id: int
    title: str
    description: str
    detail_content: Optional[str]
    thumbnail: str
    images: Optional[list[str]]
    role: str
    team_size: Optional[int]
    github_url: Optional[str]
    live_url: Optional[str]
    start_date: str
    end_date: Optional[str]
    status: str
    featured: bool
    owner_id: int
    tech_stack_names: list[str] = Field(alias="tech_stacks")
    created_at: datetime
    updated_at: datetime

    @field_validator("tech_stack_names", mode='before')
    @classmethod
    def flatten_tech_stacks(cls, v: Any) -> list[str]:
        """ORMX tech_stacks 기술 스택 배열 전환"""
        if isinstance(v, list):
            return [tech.tech_name for tech in v]
        return v

    class Config:
        from_attributes = True
        populate_by_name = True


class ProjectListResponse(BaseModel):
    """프로젝트 목록 조회 응답"""
    id: int
    title: str
    description: str
    thumbnail: str
    role: str
    start_date: str
    end_date: Optional[str]
    status: str
    featured: bool
    tech_stack_names: list[str] = Field(alias="tech_stacks")
    created_at: datetime

    @field_validator("tech_stack_names", mode='before')
    @classmethod
    def flatten_tech_stacks(cls, v: Any) -> list[str]:
        """ORMX tech_stacks 기술 스택 배열 전환"""

        if isinstance(v, list):
            return [tech.tech_name for tech in v]
        return v

    class Config:
        from_attributes = True
        populate_by_name = True
