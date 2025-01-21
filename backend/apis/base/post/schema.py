from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Post(BaseModel):
    title: str
    contents: str
    author: str
    updated_at: Optional['datetime'] = None
    created_at: Optional['datetime'] = None


class PostUpdater(Post):
    id: str


class PostDelete(Post):
    id: str
