from fastapi import APIRouter
router = APIRouter()

@router.get("/{user_id}")
async def get_user(user_id: str):
    return {"message": f"Get user {user_id} - to be implemented"}
