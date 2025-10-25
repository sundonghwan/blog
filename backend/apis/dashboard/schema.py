from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class RecentPostSummary(BaseModel):
    """최근 게시글 요약"""
    id: int
    title: str
    category: str
    view_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class RecentProjectSummary(BaseModel):
    """최근 프로젝트 요약"""
    id: int
    title: str
    status: str
    featured: bool
    created_at: datetime

    class Config:
        from_attributes = True


class DashboardStatsResponse(BaseModel):
    """대시보드 통계 응답"""
    total_posts: int
    total_projects: int
    total_views: int
    recent_posts: list[RecentPostSummary]
    recent_projects: list[RecentProjectSummary]
