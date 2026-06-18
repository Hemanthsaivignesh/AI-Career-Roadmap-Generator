from typing import Any


PROJECT_BANK = {
    "AI Engineer": [
        ("Beginner", "Prompt Lab Journal", "Build a prompt testing notebook that compares outputs and tracks quality.", ["Python", "LLMs"]),
        ("Intermediate", "RAG Career Advisor", "Create a document-grounded assistant with vector search and citations.", ["Vector Databases", "APIs", "LLMs"]),
        ("Advanced", "Production AI Evaluator", "Deploy an evaluation dashboard for latency, cost, safety, and answer quality.", ["MLOps", "FastAPI", "Monitoring"]),
    ],
    "Data Scientist": [
        ("Beginner", "Insight Notebook", "Analyze a public dataset and publish clear findings.", ["Python", "Pandas", "Visualization"]),
        ("Intermediate", "Churn Predictor", "Train, validate, and explain a customer churn model.", ["Machine Learning", "Statistics"]),
        ("Advanced", "Experiment Platform", "Design an A/B testing dashboard with statistical guardrails.", ["SQL", "Experimentation"]),
    ],
    "Full Stack Developer": [
        ("Beginner", "Personal Task Board", "Create a CRUD app with authentication and responsive UI.", ["React", "APIs"]),
        ("Intermediate", "Team Knowledge Hub", "Build search, permissions, and file attachments.", ["Databases", "Testing"]),
        ("Advanced", "SaaS Starter Kit", "Ship billing-ready multi-tenant app infrastructure.", ["Cloud Deployment", "System Design"]),
    ],
    "DevOps Engineer": [
        ("Beginner", "Linux Ops Workbook", "Automate backups, logs, and health checks.", ["Linux", "Scripting"]),
        ("Intermediate", "CI/CD Pipeline", "Containerize and deploy a web service with automated tests.", ["Docker", "CI/CD"]),
        ("Advanced", "Kubernetes Platform", "Create observability, autoscaling, and rollback workflows.", ["Kubernetes", "Monitoring"]),
    ],
    "Cybersecurity Analyst": [
        ("Beginner", "Home Lab Scanner", "Document network discovery and baseline hardening.", ["Networking", "Nmap"]),
        ("Intermediate", "SOC Alert Triage", "Build a dashboard for alert priority and evidence.", ["SIEM", "Incident Response"]),
        ("Advanced", "Cloud Threat Model", "Map cloud risks and create detection playbooks.", ["Cloud Security", "Threat Modeling"]),
    ],
}


def recommend_projects(target_role: str) -> list[dict[str, Any]]:
    entries = PROJECT_BANK.get(target_role, PROJECT_BANK["AI Engineer"])
    return [
        {
            "level": level,
            "title": title,
            "description": description,
            "skills_covered": skills,
        }
        for level, title, description, skills in entries
    ]
