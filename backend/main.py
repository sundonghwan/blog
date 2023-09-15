import uvicorn
from fastapi import FastAPI
from database import setting
from database.manage import initDb

app = FastAPI()


@app.get("/health")
def healthCheck():
    return {
        "health": "Ok"
    }

if __name__ == " __main__":
    # uvicorn.run("main:app")
    initDb()