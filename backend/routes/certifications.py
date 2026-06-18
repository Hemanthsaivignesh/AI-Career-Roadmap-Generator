from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel

from backend.services.certification_recommender import recommend_certifications

router = APIRouter(tags=["Certifications"])


class CertificationRequest(BaseModel):
    target_role: str
    experience_level: str = "Beginner"


@router.post("/recommend-certifications")
def certifications(payload: CertificationRequest) -> list[dict[str, Any]]:
    return recommend_certifications(payload.target_role, payload.experience_level)
