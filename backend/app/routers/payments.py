from fastapi import APIRouter
router = APIRouter()

@router.post("/")
async def create_payment():
    return {"message": "Create payment - to be implemented"}
