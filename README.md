# Career Atlas AI

A full-stack AI career roadmap generator that turns a learner's current skills, target role, available study time, and experience level into a personalized weekly plan.

## Run locally

Open two PowerShell terminals in the project root.

### 1. Start the backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend\requirements.txt
Copy-Item backend\.env.example backend\.env
uvicorn backend.app:app --reload --port 8000
```

The API is available at <http://127.0.0.1:8000> and its interactive documentation at <http://127.0.0.1:8000/docs>.

### 2. Start the frontend

```powershell
cd frontend
npm install
npm run dev
```

Open <http://127.0.0.1:5173>.

> Do not open `frontend/index.html` with VS Code Live Server. This is a Vite/React application, so serving that file on port 5500 will not correctly load the JSX application.

## What is included

- Skill-gap analysis for five in-demand technology career paths
- AI-generated roadmaps with a built-in offline fallback
- Weekly milestones and persistent completion tracking
- Portfolio project and certification recommendations
- Realtime WebSocket activity
- PDF and JSON exports
- Responsive light/dark interface
- English, Hindi, and Telugu UI options
- SQLite persistence with FastAPI and SQLAlchemy

The application works without an OpenAI key. To enable model-generated plans, add `OPENAI_API_KEY` to `backend/.env`.

More technical details are in [docs/README.md](docs/README.md).
