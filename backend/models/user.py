from sqlalchemy import JSON, Column, Integer, String
from sqlalchemy.orm import relationship

from backend.database.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    current_skills = Column(JSON, default=list)
    experience_level = Column(String(40), nullable=False)
    target_role = Column(String(120), nullable=False)

    roadmaps = relationship("Roadmap", back_populates="user", cascade="all, delete-orphan")
