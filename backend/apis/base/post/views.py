from fastapi import APIRouter
from fastapi.security import OAuth2PasswordBearer
from apis.base.post.schema import Blog
from databases.connection import postgres_db
from apis.base.auth.controller import jwt_required
post_router = APIRouter("/post")


@post_router.post("/create")
@jwt_required
async def blog_create(requests:Blog):
    pass
