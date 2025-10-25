from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from fastapi import Depends, HTTPException
from typing import Optional
from apis.auth.controller import AuthController
from apis.project.models import Project, Project_tech_stack
from apis.project import schema
from database.engine import get_db


class ProjectController:
    def __init__(self, db: Session = Depends(get_db), auth_controller: AuthController = Depends()):
        self.db = db
        self.auth_controller = auth_controller

    # ===== Project CRUD =====

    def get_projects(
        self,
        status: Optional[str] = None,
        featured: Optional[bool] = None,
        skip: int = 0,
        limit: int = 10
    ):
        """프로젝트 목록 조회 (필터링 가능)"""
        query = self.db.query(Project)\
            .options(joinedload(Project.tech_stacks))\
            .filter(Project.is_deleted == False)

        if status:
            query = query.filter(Project.status == status)

        if featured is not None:
            query = query.filter(Project.featured == featured)

        # 최신순 정렬
        query = query.order_by(Project.created_at.desc())

        projects = query.offset(skip).limit(limit).all()
        return projects

    def get_project_by_id(self, project_id: int):
        """ID로 프로젝트 조회"""
        return self.db.query(Project)\
            .options(joinedload(Project.tech_stacks))\
            .filter(Project.id == project_id, Project.is_deleted == False)\
            .first()

    def create_project(self, project_create: schema.ProjectCreate, email: str):
        """프로젝트 생성"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 프로젝트 조회
        project_data = project_create.dict()
        project_data["owner_id"] = user.id

        db_project = Project(**project_data)

        try:
            self.db.add(db_project)
            self.db.commit()
            self.db.refresh(db_project)
            return db_project
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Project creation failed")

    def update_project(self, project_id: int, project_update: schema.ProjectUpdate, email: str):
        """프로젝트 수정"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 프로젝트 조회
        project = self.get_project_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 3. 권한 체크
        if project.owner_id != user.id:
            raise HTTPException(status_code=403, detail="Not authorized to update this project")

        # 4. 프로젝트 수정
        for key, value in project_update.dict(exclude_unset=True).items():
            setattr(project, key, value)

        try:
            self.db.commit()
            self.db.refresh(project)
            return project
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Project update failed")

    def delete_project(self, project_id: int, email: str):
        """프로젝트 삭제 (soft delete)"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 프로젝트 조회
        project = self.get_project_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 3. 권한 체크
        if project.owner_id != user.id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this project")

        # 4. Soft delete
        project.is_deleted = True
        self.db.commit()
        return {"message": "Project deleted successfully"}

    # ===== Tech Stack =====

    def add_tech_stack(self, project_id: int, tech_create: schema.TechStackCreate, email: str):
        """기술 스택 추가"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 프로젝트 조회
        project = self.get_project_by_id(project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 3. 권한 체크
        if project.owner_id != user.id:
            raise HTTPException(status_code=403, detail="Not authorized to modify this project")

        # 4. 기술 스택 추가
        tech_stack = Project_tech_stack(
            project_id=project.id,
            tech_name=tech_create.tech_name
        )

        try:
            self.db.add(tech_stack)
            self.db.commit()
            self.db.refresh(tech_stack)
            return tech_stack
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Tech stack creation failed")

    def delete_tech_stack(self, tech_id: int, email: str):
        """기술 스택 삭제"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 기술 스택 조회
        tech_stack = self.db.query(Project_tech_stack)\
            .filter(Project_tech_stack.id == tech_id)\
            .first()

        if not tech_stack:
            raise HTTPException(status_code=404, detail="Tech stack not found")

        # 3. 기존 프로젝트 조회
        project = self.get_project_by_id(tech_stack.project_id)
        if not project:
            raise HTTPException(status_code=404, detail="Project not found")

        # 4. 권한 체크
        if project.owner_id != user.id:
            raise HTTPException(status_code=403, detail="Not authorized to modify this project")

        # 5. 기술 스택 삭제
        self.db.delete(tech_stack)
        self.db.commit()
        return {"message": "Tech stack deleted successfully"}
