from sqlalchemy import JSON, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from backend.database.db import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    goal = Column(String(160), nullable=False)
    timeline = Column(String(80), nullable=False)
    learning_plan = Column(JSON, nullable=False)
    certifications = Column(JSON, default=list)
    projects = Column(JSON, default=list)
    progress = Column(JSON, default=dict)

    user = relationship("User", back_populates="roadmaps")
