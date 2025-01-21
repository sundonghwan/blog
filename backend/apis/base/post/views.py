from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from apis.base.post.schema import Post
from databases.connection import postgres_db
from apis.base.auth.controller import oauth2_schema

post_router = APIRouter(prefix="/post")


@post_router.post("/create")
async def post_create(requests:Post, db:Session=Depends(postgres_db.get_db), current_user = Depends(oauth2_schema)):
    requests
    current_user
    pass
