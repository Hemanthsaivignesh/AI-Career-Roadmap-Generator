from __future__ import annotations

import json
import os
from typing import Any

from backend.services.roadmap_generator import generate_local_roadmap


def generate_ai_roadmap(payload: dict[str, Any]) -> dict[str, Any]:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return generate_local_roadmap(payload)

    try:
        from openai import OpenAI

        client = OpenAI(api_key=api_key)
        prompt = (
            "Create a career roadmap as strict JSON with keys skill_gap_analysis and roadmap. "
            "Roadmap must include stages and weekly_milestones. User payload: "
            f"{json.dumps(payload)}"
        )
        response = client.responses.create(
            model=os.getenv("OPENAI_MODEL", "gpt-4o"),
            input=prompt,
            temperature=0.4,
        )
        text = response.output_text.strip()
        return json.loads(text)
    except Exception:
        return generate_local_roadmap(payload)
