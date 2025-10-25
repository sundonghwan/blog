from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from fastapi import Depends, HTTPException
from apis.auth.controller import AuthController
from apis.profile.models import Profile, Profile_skills, Profile_timeline
from apis.profile import schema
from database.engine import get_db


class ProfileController:
    def __init__(self, db: Session = Depends(get_db), auth_controller: AuthController = Depends()):
        self.db = db
        self.auth_controller = auth_controller

    # ===== Profile CRUD =====

    def get_profile_by_user_id(self, user_id: int):
        """User ID로 프로필 조회"""
        return self.db.query(Profile)\
            .options(joinedload(Profile.skills), joinedload(Profile.timeline))\
            .filter(Profile.user_id == user_id)\
            .first()

    def create_profile(self, profile_create: schema.ProfileCreate, email: str):
        """프로필 생성"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 기존 프로필 조회
        existing_profile = self.get_profile_by_user_id(user.id)
        if existing_profile:
            raise HTTPException(status_code=400, detail="Profile already exists")

        # 3. 프로필 생성
        profile_data = profile_create.dict()
        profile_data["user_id"] = user.id

        db_profile = Profile(**profile_data)

        try:
            self.db.add(db_profile)
            self.db.commit()
            self.db.refresh(db_profile)
            return db_profile
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Profile creation failed")

    def update_profile(self, profile_update: schema.ProfileUpdate, email: str):
        """프로필 수정"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 프로필 조회
        profile = self.get_profile_by_user_id(user.id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")

        # 3. 프로필 수정
        for key, value in profile_update.dict(exclude_unset=True).items():
            setattr(profile, key, value)

        try:
            self.db.commit()
            self.db.refresh(profile)
            return profile
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Profile update failed")

    # ===== Skills =====

    def add_skill(self, skill_create: schema.SkillCreate, email: str):
        """기술 스택 추가 (사용자 이메일 기반)"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 프로필 조회
        profile = self.get_profile_by_user_id(user.id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found. Create profile first.")

        # 3. �� �1
        skill = Profile_skills(
            profile_id=profile.id,
            skill_name=skill_create.skill_name,
            category=skill_create.category
        )

        try:
            self.db.add(skill)
            self.db.commit()
            self.db.refresh(skill)
            return skill
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Skill creation failed")

    def delete_skill(self, skill_id: int, email: str):
        """기술 스택 삭제 (사용자 이메일 기반)"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 프로필 조회
        profile = self.get_profile_by_user_id(user.id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")

        # 3. 기술 스택 조회
        skill = self.db.query(Profile_skills).filter(
            Profile_skills.id == skill_id,
            Profile_skills.profile_id == profile.id
        ).first()

        if not skill:
            raise HTTPException(status_code=404, detail="Skill not found or unauthorized")

        # 4. 삭제
        self.db.delete(skill)
        self.db.commit()
        return {"message": "Skill deleted successfully"}

    # ===== Timeline =====

    def add_timeline_event(self, timeline_create: schema.TimelineCreate, email: str):
        """타임라인 생성 (사용자 이메일 기반)"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 프로필 조회
        profile = self.get_profile_by_user_id(user.id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found. Create profile first.")

        # 3. 타임라인 이벤트 생성
        timeline = Profile_timeline(
            profile_id=profile.id,
            event_title=timeline_create.event_title,
            event_description=timeline_create.event_description,
            event_date=timeline_create.event_date
        )

        try:
            self.db.add(timeline)
            self.db.commit()
            self.db.refresh(timeline)
            return timeline
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Timeline event creation failed")

    def delete_timeline_event(self, timeline_id: int, email: str):
        """타임라인 삭제 (사용자 이메일 기반)"""
        # 1. 사용자 조회
        user = self.auth_controller.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # 2. 프로필 조회
        profile = self.get_profile_by_user_id(user.id)
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")

        # 3. 타임라인 이벤트 조회
        timeline = self.db.query(Profile_timeline).filter(
            Profile_timeline.id == timeline_id,
            Profile_timeline.profile_id == profile.id
        ).first()

        if not timeline:
            raise HTTPException(status_code=404, detail="Timeline event not found or unauthorized")

        # 4. 삭제
        self.db.delete(timeline)
        self.db.commit()
        return {"message": "Timeline event deleted successfully"}
