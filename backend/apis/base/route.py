from fastapi import APIRouter

base_router = APIRouter(prefix="v1")
base_router.include_router()