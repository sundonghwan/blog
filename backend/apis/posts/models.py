from database.engine import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func  # ★서버 시간 사용을 위해 임포트

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    
    # [수정] String -> Text (긴 글)
    content = Column(Text, nullable=False) 

    # [추가] Excerpt (요약)
    excerpt = Column(String(150), nullable=False)

    # category 
    category = Column(String, index=True, nullable=False)

    # cover image URL
    cover_image = Column(String, nullable=True)

    # 읽는 시간 (분 단위, 프론트에서 계산해서 전달 또는 백엔드에서 자동 계산)
    read_time = Column(Integer, nullable=True)

    # 조회수
    view_count = Column(Integer, nullable=False, default=0)

    # 작성자(User) ID
    author_id = Column(Integer, ForeignKey("users.id"))

    # Post의 작성자(User)
    author = relationship("User", back_populates="posts")
    
    # [수정] 의미/로직 정상화 (기본: 삭제 안 됨)
    is_deleted = Column(Boolean, nullable=False, default=False) 
 
    # [개선] Integer -> Boolean (기본: 발행 안 됨)
    is_published = Column(Boolean, nullable=False, default=False) 
    
    # [수정] Integer -> DateTime (생성 시각 자동 기록)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # [수정] Integer -> DateTime (업데이트 시각 자동 갱신)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    @property
    def tag_names(self) -> list[str]:
        """태그 이름 리스트 반환"""
        return [tag.tag_name for tag in self.tags]

    @property
    def published(self) -> bool:
        """Frontend에서 published로 사용"""
        return self.is_published

class PostTags(Base):
    __tablename__ = "post_tags"

    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    tag_name = Column(String, nullable=False)
    post = relationship("Post", backref="tags")