from fastapi import APIRouter
router = APIRouter()

@router.post("/")
async def create_booking():
    return {"message": "Create booking - to be implemented"}

@router.get("/")
async def get_bookings():
    return {"message": "Get bookings - to be implemented"}
