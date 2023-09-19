from fastapi import APIRouter
from app.account.v1.views import user
account_api_router = APIRouter()
account_api_router.include_router(user.router, prefix="/apis/v1")
