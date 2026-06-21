# AI Career Roadmap Generator

A full-stack career planning workbench built with React, Vite, Tailwind CSS, FastAPI, SQLAlchemy, and SQLite.

## Features

- Skill gap analysis for AI Engineer, Data Scientist, Full Stack Developer, DevOps Engineer, and Cybersecurity Analyst tracks.
- AI roadmap generation using OpenAI when `OPENAI_API_KEY` is available, with a local fallback generator so demos still work offline.
- Weekly milestones, three learning stages, certification recommendations, project suggestions, and progress tracking.
- English default UI with Hindi and Telugu language switching.
- Dark/light mode, responsive sidebar layout, toast messages, progress bars, PDF export, and JSON export.
- SQLite persistence for users, saved roadmaps, and milestone completion.
- Minimal JWT login endpoint for auth integration.

## Backend Setup

Run these commands from the project root:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
copy backend\.env.example backend\.env
uvicorn backend.app:app --reload --port 8000
```

The API runs at `http://localhost:8000`.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

Do not use VS Code Live Server for `frontend/index.html`. Vite must transform the React JSX modules, so use `npm run dev`.

## API

- `GET /health`
- `POST /auth/login`
- `POST /analyze-skills`
- `POST /generate-roadmap`
- `POST /recommend-certifications`
- `POST /projects`
- `GET /progress`
- `POST /progress`
- `WS /ws/roadmaps` for realtime generation and progress activity

## Realtime Behavior

The frontend opens a WebSocket connection to `/ws/roadmaps`. When a roadmap is generated or a milestone is marked complete, the backend broadcasts live events so the activity panel and progress dashboard update immediately.

## OpenAI

Set these in `backend/.env`:

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4o
JWT_SECRET=replace-with-a-long-random-secret
```

Without an API key, the app uses its built-in roadmap generator.

## Docker

Create `backend/.env` from `.env.example`, then run:

```bash
docker compose up --build
```

## Portfolio Ideas

Good next upgrades are resume PDF parsing, LinkedIn import, a mentor chatbot, course marketplace recommendations, and a calendar planner with reminders.
