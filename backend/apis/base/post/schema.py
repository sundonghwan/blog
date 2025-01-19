from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Blog(BaseModel):
    title: str
    contents: str
    author: str
    updated_at: Optional['datetime'] = None
    created_at: Optional['datetime'] = None


class BlogUpdater(Blog):
    id: str


class BlogDelete(Blog):
    id: str
    