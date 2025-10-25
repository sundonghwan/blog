from typing import Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy.exc import IntegrityError
from fastapi import Depends, HTTPException
from apis.auth.controller import AuthController
from apis.posts.models import Post, PostTags
from apis.posts.schema import PostUpdate
from database.engine import get_db

class PostController:
    def __init__(self, db: Session = Depends(get_db), auth_controller: AuthController = Depends()):
        self.db = db
        self.auth_controller = auth_controller

    def get_all_posts(self, email: str):
        """모든 Posts 조회 (관리자용)"""
        user = self.auth_controller.get_user_by_email(email)
        if not user or not user.is_superuser:
            raise HTTPException(status_code=403, detail="Not authorized to view all posts")
        query = self.db.query(Post).options(joinedload(Post.tags)).filter(Post.is_deleted == False)
        return query.order_by(Post.created_at.desc()).all()

    def get_posts(self, category: Optional[str] = None, search: Optional[str] = None, skip: int = 0, limit: int = 10):
        """Posts 조회 with 필터링 및 페이징"""
        query = self.db.query(Post).options(joinedload(Post.tags)).filter(Post.is_deleted == False, Post.is_published == True)

        if category:
            query = query.filter(Post.category == category)

        if search:
            search_term = f"%{search}%"
            query = query.filter(Post.title.ilike(search_term) | Post.content.ilike(search_term))
        query = query.order_by(Post.created_at.desc())
        posts = query.offset(skip).limit(limit).all()
        
        return posts

    def get_post_by_id(self, post_id: int):
        """ID로 Post 조회"""
        return self.db.query(Post).options(joinedload(Post.tags)).filter(Post.id == post_id).first()
    
    def create_post(self, post_create, email: str):
        """Post creation - Step 1"""
        post_data = post_create.dict(exclude={"tags"})
        author_id = self.auth_controller.get_user_by_email(email).id
        post_data["author_id"] = author_id
        post_data["read_time"] = max(1, len(post_create.content) // 200)

        # 1. Post 객체 생성
        db_post = Post(**post_data)
        try:
            self.db.add(db_post)
            self.db.flush()
            if post_create.tags:
                for tag_name in post_create.tags:
                    tag = PostTags(post_id=db_post.id, tag_name=tag_name)
                    self.db.add(tag)

            self.db.commit()
            self.db.refresh(db_post)
            return db_post
        
        except IntegrityError:
            self.db.rollback()
            raise HTTPException(status_code=400, detail="Post creation failed due to integrity error.")

    def increment_view_count(self, post_id: int, email: Optional[str] = None):
        """Increase the view count of a post"""
        post = self.db.query(Post).options(joinedload(Post.tags)).filter(Post.id == post_id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        if email:
            user = self.auth_controller.get_user_by_email(email)
            if user and post.author_id == user.id:
                return {"message": "Authors cannot increment view count on their own posts"}
        post.view_count += 1

        self.db.commit()
        self.db.refresh(post)
        return post

    def update_post(self, post_id: int, post_update: PostUpdate, email: str):
        """Update a Post"""
        post = self.db.query(Post).options(joinedload(Post.tags)).filter(Post.id == post_id).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")

        user = self.auth_controller.get_user_by_email(email)
        if post.author_id != user.id:
            raise HTTPException(status_code=403, detail="Not authorized to update this post")

        for key, value in post_update.dict(exclude_unset=True).items():
            setattr(post, key, value)

        self.db.commit()
        self.db.refresh(post)
        return post