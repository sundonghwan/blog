from fastapi import APIRouter

post_router = APIRouter("/post")

@post_router.post("/create")
async def blog_create(request):
    