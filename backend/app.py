from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.database.db import init_db
from backend.routes.auth import router as auth_router
from backend.routes.certifications import router as certifications_router
from backend.routes.realtime import router as realtime_router
from backend.routes.roadmap import router as roadmap_router
from backend.routes.skill_analysis import router as skill_analysis_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="AI Career Roadmap Generator", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(skill_analysis_router)
app.include_router(roadmap_router)
app.include_router(certifications_router)
app.include_router(auth_router)
app.include_router(realtime_router)
