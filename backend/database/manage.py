from database.setting import Base, engine
from app.account.v1.models.user import User
Base.metadata.create_all(engine)
def initDb():
    try:
        Base.metadata.create_all(engine)
    except:
        raise "Error"

if __name__ == "__main__":
    initDb()