import json
from pathlib import Path
from typing import Any

DATA_DIR = Path(__file__).resolve().parents[2] / "data"


def recommend_certifications(target_role: str, experience_level: str = "Beginner") -> list[dict[str, Any]]:
    with open(DATA_DIR / "certifications.json", encoding="utf-8") as file:
        certifications = json.load(file)

    matches = [cert for cert in certifications if target_role in cert["roles"]]
    if experience_level == "Advanced":
        matches = sorted(matches, key=lambda cert: cert["difficulty"] != "Advanced")
    return matches[:4]
