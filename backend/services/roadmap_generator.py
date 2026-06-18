from __future__ import annotations

import json
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).resolve().parents[2] / "data"


def _load_json(filename: str) -> Any:
    with open(DATA_DIR / filename, encoding="utf-8") as file:
        return json.load(file)


CAREER_PATHS = _load_json("career_paths.json")


def normalize_skills(skills: list[str]) -> list[str]:
    aliases = _load_json("skills.json").get("skill_aliases", {})
    normalized = []
    for skill in skills:
        clean = skill.strip()
        if not clean:
            continue
        normalized.append(aliases.get(clean.lower(), clean.title() if clean.islower() else clean))
    return sorted(set(normalized), key=str.lower)


def analyze_skill_gap(current_skills: list[str], target_role: str, experience_level: str) -> dict[str, Any]:
    current = normalize_skills(current_skills)
    role_profile = CAREER_PATHS.get(target_role, CAREER_PATHS["AI Engineer"])
    required = role_profile["core_skills"]
    current_lower = {skill.lower() for skill in current}
    missing = [skill for skill in required if skill.lower() not in current_lower]
    matched = [skill for skill in required if skill.lower() in current_lower]
    readiness = round((len(matched) / max(len(required), 1)) * 100)

    return {
        "target_role": target_role,
        "experience_level": experience_level,
        "current_skills": current,
        "required_skills": required,
        "matched_skills": matched,
        "missing_skills": missing,
        "readiness_score": readiness,
        "recommended_tools": role_profile["tools"],
        "suggested_roles": role_profile["roles"],
    }


def _weekly_milestones(topics: list[str], duration_weeks: int, hours_per_week: int) -> list[dict[str, Any]]:
    milestones = []
    for week in range(1, duration_weeks + 1):
        topic = topics[(week - 1) % len(topics)]
        milestones.append(
            {
                "id": f"week-{week}",
                "week": week,
                "title": f"Master {topic}",
                "topics": [topic, "Practice", "Notes + revision"],
                "estimated_hours": hours_per_week,
                "completed": False,
            }
        )
    return milestones


def generate_local_roadmap(payload: dict[str, Any]) -> dict[str, Any]:
    target_role = payload.get("target_role", "AI Engineer")
    skills = payload.get("current_skills", [])
    experience = payload.get("experience_level", "Beginner")
    hours = int(payload.get("study_hours_per_week", 8))
    duration = int(payload.get("target_duration_weeks", 12))
    gap = analyze_skill_gap(skills, target_role, experience)
    topics = gap["missing_skills"] or gap["required_skills"]

    stage_size = max(1, duration // 3)
    stages = [
        {
            "level": "Beginner",
            "focus": "Foundation and vocabulary",
            "difficulty": "Easy",
            "estimated_completion": f"{stage_size} weeks",
            "topics": topics[: max(2, min(len(topics), 3))],
        },
        {
            "level": "Intermediate",
            "focus": "Applied systems and guided projects",
            "difficulty": "Medium",
            "estimated_completion": f"{stage_size} weeks",
            "topics": (topics + gap["recommended_tools"])[: max(3, min(len(topics) + 2, 5))],
        },
        {
            "level": "Advanced",
            "focus": "Portfolio, deployment, and interview readiness",
            "difficulty": "Hard",
            "estimated_completion": f"{duration - stage_size * 2} weeks",
            "topics": gap["recommended_tools"] + ["System design", "Mock interviews"],
        },
    ]

    return {
        "skill_gap_analysis": gap,
        "roadmap": {
            "goal": target_role,
            "timeline": f"{duration} weeks",
            "weekly_milestones": _weekly_milestones(topics + gap["recommended_tools"], duration, hours),
            "stages": stages,
        },
    }
