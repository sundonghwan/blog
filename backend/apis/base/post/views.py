from fastapi import APIRouter
from apis.base.post.schema import Blog
from databases.connection import postgres_db

post_router = APIRouter("/post")

@post_router.post("/create")
async def blog_create(requests:Blog):
    pass
