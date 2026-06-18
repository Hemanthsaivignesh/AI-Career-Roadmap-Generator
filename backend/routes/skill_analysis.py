from typing import Any

from fastapi import APIRouter
from pydantic import BaseModel, Field

from backend.services.roadmap_generator import analyze_skill_gap

router = APIRouter(tags=["Skill Analysis"])


class SkillAnalysisRequest(BaseModel):
    current_skills: list[str] = Field(default_factory=list)
    experience_level: str
    target_role: str


@router.post("/analyze-skills")
def analyze_skills(payload: SkillAnalysisRequest) -> dict[str, Any]:
    return analyze_skill_gap(payload.current_skills, payload.target_role, payload.experience_level)
