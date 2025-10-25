from database.engine import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

class Tag(Base):
    __tablename__ = "tags"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    relationships = relationship("PostTag", back_populates="tag")