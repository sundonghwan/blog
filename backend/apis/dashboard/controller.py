from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import Depends
from database.engine import get_db
from apis.posts.models import Post
from apis.project.models import Project
from apis.dashboard import schema


class DashboardController:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    def get_dashboard_stats(self) -> schema.DashboardStatsResponse:
        """대시보드 통계 조회"""

        # 총 게시글 수 (삭제되지 않은 것만)
        total_posts = self.db.query(Post).filter(Post.is_deleted == False).count()

        # 총 프로젝트 수 (삭제되지 않은 것만)
        total_projects = self.db.query(Project).filter(Project.is_deleted == False).count()

        # 총 조회수 (모든 게시글의 view_count 합계)
        total_views = self.db.query(func.sum(Post.view_count))\
            .filter(Post.is_deleted == False)\
            .scalar() or 0

        # 최근 게시글 5개
        recent_posts = self.db.query(Post)\
            .filter(Post.is_deleted == False, Post.is_published == True)\
            .order_by(Post.created_at.desc())\
            .limit(5)\
            .all()

        # 최근 프로젝트 5개
        recent_projects = self.db.query(Project)\
            .filter(Project.is_deleted == False)\
            .order_by(Project.created_at.desc())\
            .limit(5)\
            .all()

        return schema.DashboardStatsResponse(
            total_posts=total_posts,
            total_projects=total_projects,
            total_views=total_views,
            recent_posts=recent_posts,
            recent_projects=recent_projects
        )
