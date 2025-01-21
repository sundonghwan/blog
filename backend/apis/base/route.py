from fastapi import APIRouter
from apis.base.auth.views import auth_router
from apis.base.post.views import post_router

base_router = APIRouter(prefix="/v1")
base_router.include_router(auth_router)
base_router.include_router(post_router)