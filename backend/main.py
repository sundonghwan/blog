import uvicorn
from fastapi import FastAPI
from database import setting
from database.manage import initDb
from app.account import router
app = FastAPI()

app.include_router(router.account_api_router)


@app.get("/health")
def healthCheck():
    return {
        "health": "Ok"
    }

if __name__ == "__main__":
    print("hi")
    uvicorn.run("main:app")