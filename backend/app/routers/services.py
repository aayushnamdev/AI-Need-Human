"""
Service endpoints
Handles service listings CRUD
"""

from fastapi import APIRouter, HTTPException, status, Depends
from supabase import Client
from typing import List
from services.supabase import get_supabase

router = APIRouter()


@router.get("/")
async def get_services(
    skip: int = 0,
    limit: int = 20,
    skill: str = None,
    max_rate: float = None,
    supabase: Client = Depends(get_supabase)
):
    """
    Get list of service listings

    - **skip**: Number of records to skip (default: 0)
    - **limit**: Maximum records to return (default: 20, max: 100)
    - **skill**: Filter by skill (case-insensitive partial match in title)
    - **max_rate**: Maximum hourly rate in USD
    """
    try:
        # Limit the max limit to prevent abuse
        limit = min(limit, 100)

        # Build query
        query = supabase.table("services").select("*, profiles(*)")

        # Apply filters
        if skill:
            # Case-insensitive search in title
            query = query.ilike("title", f"%{skill}%")

        if max_rate is not None:
            query = query.lte("rate", max_rate)

        # Only show active services
        query = query.eq("is_active", True)

        # Apply pagination and execute
        response = query.range(skip, skip + limit - 1).execute()

        return response.data

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch services: {str(e)}"
        )


@router.get("/{service_id}")
async def get_service(service_id: str, supabase: Client = Depends(get_supabase)):
    """
    Get service by ID with provider details

    Returns complete service information including the provider's profile.
    """
    try:
        # Fetch service with provider profile
        response = supabase.table("services")\
            .select("*, profiles(*)")\
            .eq("id", service_id)\
            .single()\
            .execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Service with ID '{service_id}' not found"
            )

        return response.data

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch service: {str(e)}"
        )


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_service(supabase: Client = Depends(get_supabase)):
    """Create a new service listing"""
    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Not implemented yet")
