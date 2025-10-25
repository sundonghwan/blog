from fastapi import APIRouter, Depends
from common.utils import JWTHandler
from apis.dashboard import schema
from apis.dashboard.controller import DashboardController

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=schema.DashboardStatsResponse)
async def get_dashboard_stats(
    email: str = Depends(JWTHandler.verify_token),
    controller: DashboardController = Depends()
):
    """대시보드 통계 조회 (관리자용)"""
    return controller.get_dashboard_stats()
