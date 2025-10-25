from fastapi import APIRouter
from apis.auth.views import router as auth_router
from apis.posts.views import router as post_router
from apis.profile.views import router as profile_router
from apis.project.views import router as project_router
from apis.dashboard.views import router as dashboard_router

router = APIRouter(prefix="/apis/v1")
router.include_router(auth_router)
router.include_router(post_router)
router.include_router(profile_router)
router.include_router(project_router)
router.include_router(dashboard_router)