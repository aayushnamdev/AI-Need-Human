from fastapi import APIRouter
router = APIRouter()

@router.post("/signup")
async def signup():
    return {"message": "Signup endpoint - to be implemented"}

@router.post("/login")
async def login():
    return {"message": "Login endpoint - to be implemented"}

@router.get("/me")
async def get_current_user():
    return {"message": "Get current user - to be implemented"}
