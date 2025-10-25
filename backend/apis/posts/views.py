from typing import Optional
from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from common.utils import JWTHandler
from database.engine import get_db
from apis.posts.schema import PostCreate, PostUpdate, PostResponse
from apis.posts.controller import PostController
router = APIRouter(prefix="/posts", tags=["Posts"])  # noqa: F401

@router.get("/", response_model=list[PostResponse])
async def get_posts(
    category: Optional[str] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 10,
    controller: PostController = Depends()
):
    """
    /posts → 전체 포스트
    /posts?category=React → 카테고리 필터
    /posts?search=typescript → 검색
    /posts?category=React&search=hook → 복합 필터
    """
    return controller.get_posts(category=category, search=search, skip=skip, limit=limit)
@router.get("/all", response_model=list[PostResponse])
async def get_all_posts(controller: PostController = Depends(), email: str = Depends(JWTHandler.verify_token)):
    return controller.get_all_posts(email=email)

@router.post("/create")
async def create_post(requests: PostCreate, controller: PostController = Depends(), email: str = Depends(JWTHandler.verify_token)):
    return controller.create_post(requests, email=email)

@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id: int, controller: PostController = Depends()):
    return controller.get_post_by_id(post_id)

# 조회수 증가
@router.post("/{post_id}/view")
async def view_post(post_id: int, controller: PostController = Depends(), email: Optional[str] = Depends(JWTHandler.verify_token_optional)):
    return controller.increment_view_count(post_id, email=email)

@router.put("/{post_id}")
async def update_post(post_id: int, requests: PostUpdate, controller: PostController = Depends(), email: str = Depends(JWTHandler.verify_token)):
    return controller.update_post(post_id, requests, email=email)

@router.delete("/{post_id}")
async def delete_post(post_id: int, controller: PostController = Depends(), email: str = Depends(JWTHandler.verify_token)):
    return controller.delete_post(post_id, email=email)

