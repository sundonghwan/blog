from database.engine import Base
from sqlalchemy import JSON, DateTime, Text, Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func  # ★서버 시간 사용을 위해 임포트

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)

    # 프로젝트 설명
    description = Column(Text, nullable=False)

    # 상세 내용 (optional)
    detail_content = Column(Text, nullable=True)

    # 썸네일 이미지 URL
    thumbnail = Column(String, nullable=False)

    # 추가 이미지들 (JSON 배열)
    images = Column(JSON, nullable=True)

    # 역할
    role = Column(String, nullable=False)

    # 팀 규모
    team_size = Column(Integer, nullable=True)

    # GitHub URL
    github_url = Column(String, nullable=True)

    # Live/Demo URL
    live_url = Column(String, nullable=True)

    # 시작일
    start_date = Column(String, nullable=False)

    # 종료일 (optional)
    end_date = Column(String, nullable=True)

    # 상태: completed, in-progress, archived
    status = Column(String, nullable=False, default="in-progress")

    # 추천 프로젝트 여부
    featured = Column(Boolean, nullable=False, default=False)

    # 작성자(User) ID
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Project의 작성자(User)
    owner = relationship("User", back_populates="projects")

    # Project의 기술 스택 목록 (Post의 tags와 동일한 방식)
    tech_stacks = relationship("Project_tech_stack", back_populates="project")

    # 삭제 여부 (Post와 동일)
    is_deleted = Column(Boolean, nullable=False, default=False)

    # 생성 시각 자동 기록
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # 업데이트 시각 자동 갱신
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

class Project_tech_stack(Base):
    __tablename__ = "project_tech_stack"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    tech_name = Column(String, nullable=False)

    project = relationship("Project", back_populates="tech_stacks")

