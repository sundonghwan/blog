import models
from apis.base.post.schema import Post


class PostController:
    def __init__(self, db):
        self.db = db

    async def register(self, post: Post):
        db_user = models.Post()

    async def search(self, post: Post):
        pass

    async def delete(self, post: Post):
        pass

    async def update(self, post: Post):
        pass