from datetime import datetime, timedelta, timezone
import os

import jwt
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/auth", tags=["Auth"])


class LoginRequest(BaseModel):
    email: EmailStr
    name: str = "Roadmap User"


@router.post("/login")
def login(payload: LoginRequest) -> dict[str, str]:
    secret = os.getenv("JWT_SECRET", "dev-secret-change-me-32-bytes-minimum")
    if secret == "dev-secret-change-me-32-bytes-minimum" and os.getenv("ENV") == "production":
        raise HTTPException(status_code=500, detail="JWT_SECRET is required in production")

    token = jwt.encode(
        {
            "sub": payload.email,
            "name": payload.name,
            "exp": datetime.now(timezone.utc) + timedelta(days=7),
        },
        secret,
        algorithm="HS256",
    )
    return {"access_token": token, "token_type": "bearer"}
