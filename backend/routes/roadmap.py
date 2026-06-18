from typing import Any

from fastapi import APIRouter, Depends
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from backend.database.db import get_db
from backend.models.roadmap import Roadmap
from backend.models.user import User
from backend.services.ai_engine import generate_ai_roadmap
from backend.services.certification_recommender import recommend_certifications
from backend.services.project_recommender import recommend_projects
from backend.services.realtime import realtime_hub

router = APIRouter(tags=["Roadmaps"])


class RoadmapRequest(BaseModel):
    name: str = "Portfolio Builder"
    email: EmailStr = "portfolio@example.com"
    current_skills: list[str] = Field(default_factory=list)
    interests: list[str] = Field(default_factory=list)
    experience_level: str = "Beginner"
    target_role: str = "AI Engineer"
    study_hours_per_week: int = Field(default=8, ge=1, le=60)
    target_duration_weeks: int = Field(default=12, ge=3, le=52)


class ProgressUpdate(BaseModel):
    roadmap_id: int
    milestone_id: str
    completed: bool


@router.post("/generate-roadmap")
async def generate_roadmap(payload: RoadmapRequest, db: Session = Depends(get_db)) -> dict[str, Any]:
    await realtime_hub.broadcast(
        {
            "type": "roadmap_generation_started",
            "message": f"Analyzing skills for {payload.target_role}.",
            "target_role": payload.target_role,
        }
    )
    ai_result = generate_ai_roadmap(payload.model_dump())
    await realtime_hub.broadcast(
        {
            "type": "skill_gap_detected",
            "message": "Skill gaps detected and learning stages drafted.",
            "skill_gap_analysis": ai_result.get("skill_gap_analysis", {}),
        }
    )
    certifications = recommend_certifications(payload.target_role, payload.experience_level)
    projects = recommend_projects(payload.target_role)
    milestones = ai_result["roadmap"].get("weekly_milestones", [])
    progress = {item["id"]: bool(item.get("completed", False)) for item in milestones}

    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        user = User(
            name=payload.name,
            email=payload.email,
            current_skills=payload.current_skills,
            experience_level=payload.experience_level,
            target_role=payload.target_role,
        )
        db.add(user)
        db.flush()

    roadmap = Roadmap(
        user_id=user.id,
        goal=payload.target_role,
        timeline=ai_result["roadmap"].get("timeline", f"{payload.target_duration_weeks} weeks"),
        learning_plan=ai_result["roadmap"],
        certifications=certifications,
        projects=projects,
        progress=progress,
    )
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)
    response = {
        "id": roadmap.id,
        **ai_result,
        "certifications": certifications,
        "projects": projects,
        "progress": _progress_payload(progress),
    }

    await realtime_hub.broadcast(
        {
            "type": "roadmap_generated",
            "message": f"Roadmap #{roadmap.id} is ready.",
            "roadmap_id": roadmap.id,
            "progress": response["progress"],
        }
    )
    return response


@router.post("/projects")
def projects(payload: RoadmapRequest) -> list[dict[str, Any]]:
    return recommend_projects(payload.target_role)


@router.get("/progress")
def get_progress(roadmap_id: int | None = None, db: Session = Depends(get_db)) -> dict[str, Any]:
    query = db.query(Roadmap).order_by(Roadmap.id.desc())
    roadmap = query.filter(Roadmap.id == roadmap_id).first() if roadmap_id else query.first()
    if not roadmap:
        return _progress_payload({})
    return {"roadmap_id": roadmap.id, **_progress_payload(roadmap.progress or {})}


@router.post("/progress")
async def update_progress(payload: ProgressUpdate, db: Session = Depends(get_db)) -> dict[str, Any]:
    roadmap = db.query(Roadmap).filter(Roadmap.id == payload.roadmap_id).first()
    if not roadmap:
        return {"error": "Roadmap not found", **_progress_payload({})}
    progress = dict(roadmap.progress or {})
    progress[payload.milestone_id] = payload.completed
    roadmap.progress = progress
    db.commit()
    response = {"roadmap_id": roadmap.id, **_progress_payload(progress)}
    await realtime_hub.broadcast(
        {
            "type": "progress_updated",
            "message": f"{payload.milestone_id} marked {'complete' if payload.completed else 'open'}.",
            "roadmap_id": roadmap.id,
            "milestone_id": payload.milestone_id,
            "completed": payload.completed,
            "progress": response,
        }
    )
    return response


def _progress_payload(progress: dict[str, bool]) -> dict[str, Any]:
    total = len(progress)
    completed = sum(1 for value in progress.values() if value)
    percentage = round((completed / total) * 100) if total else 0
    remaining = [key for key, value in progress.items() if not value]
    return {
        "completed": completed,
        "total": total,
        "percentage": percentage,
        "remaining_tasks": remaining,
        "items": progress,
    }
