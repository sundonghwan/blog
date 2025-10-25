from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.engine import get_db
from common.utils import JWTHandler
from apis.profile import schema
from apis.profile.controller import ProfileController

router = APIRouter(prefix="/profile", tags=["Profile"])


# ===== Profile API =====

@router.get("/{user_id}", response_model=schema.ProfileResponse)
async def get_profile(user_id: int, controller: ProfileController = Depends()):
    """프로필 조회 """
    profile = controller.get_profile_by_user_id(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # is_public 체크
    if not profile.is_public:
        raise HTTPException(status_code=403, detail="This profile is private")

    return profile

@router.post("/", response_model=schema.ProfileResponse)
async def create_profile(
    profile_create: schema.ProfileCreate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """프로필 생성 (사용자 이메일 기반)"""
    return controller.create_profile(profile_create, email)

@router.put("/", response_model=schema.ProfileResponse)
async def update_profile(
    profile_update: schema.ProfileUpdate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """프로필 수정 (사용자 이메일 기반)"""
    return controller.update_profile(profile_update, email)

# ===== Skills API =====

@router.post("/skills", response_model=schema.SkillResponse)
async def add_skill(
    skill_create: schema.SkillCreate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """기술 스택 추가 (사용자 이메일 기반)"""
    return controller.add_skill(skill_create, email)


@router.delete("/skills/{skill_id}")
async def delete_skill(
    skill_id: int,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """기술 스택 삭제 (사용자 이메일 기반)"""
    return controller.delete_skill(skill_id, email)


# ===== Timeline API =====

@router.post("/timeline", response_model=schema.TimelineResponse)
async def add_timeline_event(
    timeline_create: schema.TimelineCreate,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """타임라인 생성 (사용자 이메일 기반)"""
    return controller.add_timeline_event(timeline_create, email)


@router.delete("/timeline/{timeline_id}")
async def delete_timeline_event(
    timeline_id: int,
    email: str = Depends(JWTHandler.verify_token),
    controller: ProfileController = Depends()
):
    """타임라인 삭제 (사용자 이메일 기반)"""
    return controller.delete_timeline_event(timeline_id, email)
