from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apis.base import router as api_router
import apis  # 모든 모델을 로드 (SQLAlchemy relationship이 작동하도록)
import uvicorn

# FastAPI 앱 인스턴스 생성
app = FastAPI(
    title="Blog API",
    description="Personal Blog Backend API",
    version="1.0.0",
    swagger_ui_parameters={
        "persistAuthorization": True  # 새로고침 시에도 토큰 유지
    }
)

# CORS 설정
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(api_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)