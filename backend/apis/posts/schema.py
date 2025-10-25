from pydantic import BaseModel, Field, field_validator
from typing import Any, Optional
from datetime import datetime


# ===== Request Schemas =====

class PostCreate(BaseModel):
    """Post 생성"""
    title: str
    content: str
    excerpt: str
    category: str
    cover_image: Optional[str] = None
    tags: list[str] = []
    is_published: bool = False


class PostUpdate(BaseModel):
    """Post 수정"""
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[list[str]] = None
    is_published: Optional[bool] = None


# ===== Response Schemas =====
class PostResponse(BaseModel):
    """Post 요약 (제목, 요약, 커버 이미지, 카테고리, 작성일 등)"""
    id: int
    title: str
    excerpt: str
    cover_image: Optional[str]
    category: str
    tag_names: list[str] = Field(alias="tags")  # Post.tag_names → response["tags"]
    created_at: datetime
    read_time: Optional[int]
    view_count: int
    published: bool  # Post.published property 사용

    @field_validator("tag_names", mode='before')
    @classmethod
    def flatten_tags_list(cls, v: Any) -> list[str]:
        """
        ORM에서 읽어온 'tags' 관계(객체 리스트)를
        문자열('tag_name') 리스트로 변환합니다.
        """
        if isinstance(v, list):
            # v는 [<PostTags object>, <PostTags object>, ...] 리스트입니다.
            # 이 객체들에서 .tag_name 속성만 뽑아서 새 리스트를 만듭니다.
            return [tag.tag_name for tag in v]
        return v

    class Config:
        from_attributes = True
        populate_by_name = True

class PostDetailResponse(BaseModel):
    """Post 상세 (content 포함)"""
    id: int
    title: str
    content: str
    excerpt: str
    cover_image: Optional[str]
    category: str
    tag_names: list[str] = Field(alias="tags")  # Post.tag_names → response["tags"]
    created_at: datetime
    updated_at: datetime
    read_time: Optional[int]
    view_count: int
    published: bool  # Post.published property 사용
    author_id: int

    @field_validator("tag_names", mode='before')
    @classmethod
    def flatten_tags_list(cls, v: Any) -> list[str]:
        """
        ORM에서 읽어온 'tags' 관계(객체 리스트)를
        문자열('tag_name') 리스트로 변환합니다.
        """
        if isinstance(v, list):
            # v는 [<PostTags object>, <PostTags object>, ...] 리스트입니다.
            # 이 객체들에서 .tag_name 속성만 뽑아서 새 리스트를 만듭니다.
            return [tag.tag_name for tag in v]
        return v
    
    class Config:
        from_attributes = True
        populate_by_name = True


class PostListResponse(BaseModel):
    """Post 목록 (페이징 처리)"""
    total: int
    page: int
    per_page: int
    posts: list[PostResponse]

