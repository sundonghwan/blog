import uvicorn
from fastapi import FastAPI
from database import setting
from database.manage import initDb
from app.account import router
from common.tags import tags_meta_data
app = FastAPI(openapi_tags=tags_meta_data)

app.include_router(router.account_api_router)

@app.get("/health")
def healthCheck():
    return {
        "health": "Ok"
    }

if __name__ == "__main__":
    print("hi")
    uvicorn.run("main:app")