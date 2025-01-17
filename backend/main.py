from fastapi import FastAPI
import models
from databases.connection import postgres_db
from apis.base.route import base_router
from apis.base.auth import controller
import uvicorn


def init_app():
    postgres_db.init_db()
    app = FastAPI()
    app.include_router(base_router)
    return app
app = init_app()    

@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8002)