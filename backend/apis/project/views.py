from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from common.utils import JWTHandler
from apis.project import schema
from apis.project.controller import ProjectController

router = APIRouter(prefix="/project", tags=["Project"])


# ===== Project API =====

@router.get("/", response_model=list[schema.ProjectListResponse])
async def get_projects(
    status: Optional[str] = Query(None, description="Filter by status: completed, in-progress, archived"),
    featured: Optional[bool] = Query(None, description="Filter by featured"),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    controller: ProjectController = Depends()
):
    """프로젝트 목록 조회 (필터링 가능)"""
    return controller.get_projects(status=status, featured=featured, skip=skip, limit=limit)


@router.get("/{project_id}", response_model=schema.ProjectResponse)
async def get_project(project_id: int, controller: ProjectController = Depends()):
    """프로젝트 조회"""
    project = controller.get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/", response_model=schema.ProjectResponse)
async def create_project(
    project_create: schema.ProjectCreate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProjectController = Depends()
):
    """프로젝트 생성"""
    return controller.create_project(project_create, email)


@router.put("/{project_id}", response_model=schema.ProjectResponse)
async def update_project(
    project_id: int,
    project_update: schema.ProjectUpdate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProjectController = Depends()
):
    """프로젝트 수정 (x-user-email)"""
    return controller.update_project(project_id, project_update, email)


@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProjectController = Depends()
):
    """프로젝트 삭제 (x-user-email)"""
    return controller.delete_project(project_id, email)


# ===== Tech Stack API =====

@router.post("/{project_id}/tech-stack", response_model=schema.TechStackResponse)
async def add_tech_stack(
    project_id: int,
    tech_create: schema.TechStackCreate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProjectController = Depends()
):
    """기술 스택 추가 (x-user-email)"""
    return controller.add_tech_stack(project_id, tech_create, email)


@router.delete("/tech-stack/{tech_id}")
async def delete_tech_stack(
    tech_id: int,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProjectController = Depends()
):
    """기술 스택 삭제 (x-user-email)"""
    return controller.delete_tech_stack(tech_id, email)
