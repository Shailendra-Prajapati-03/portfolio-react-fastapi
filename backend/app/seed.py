"""Seed the database with the initial set of projects.

Run with:  python -m app.seed
Idempotent: existing slugs are skipped.
"""

from sqlmodel import Session, select

from .database import engine, init_db
from .models import Project

SEED_PROJECTS: list[dict] = [
    {
        "slug": "issue-tracker",
        "title": "Issue Tracker Dashboard",
        "description": "Centralized Django issue-tracking dashboard with Excel/CSV upload, live sheet sync, status tracking & filtering, and an analytics view for workflow KPIs. Deployed on Render.",
        "tags": "Django,Python,Dashboard",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        "demo_url": "https://issuetracker-dashboard.onrender.com/issues/",
        "repo_url": "https://github.com/shailendra-prajapati-03",
        "featured": True,
        "sort_order": 1,
    },
    {
        "slug": "juicejunction",
        "title": "JuiceJunction — AI-Assisted Full-Stack App",
        "description": "Full-stack app to create and customize mixed-fruit juice combinations with real-time visualization. REST APIs via Django REST Framework; interactive UI with React, Tailwind, Zustand & Framer Motion.",
        "tags": "React,Django,REST API",
        "image": "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=1200&q=80",
        "demo_url": "https://juice-junction-mixed-fruit-l4lu.vercel.app/",
        "repo_url": "https://github.com/shailendra-prajapati-03",
        "featured": True,
        "sort_order": 2,
    },
    {
        "slug": "supportdesk-crm",
        "title": "Support Desk CRM",
        "description": "A customer-support CRM to create, assign, and track support tickets through their full lifecycle, manage customer records, and monitor team performance on an analytics dashboard. React frontend with a Django REST Framework API.",
        "tags": "React,Django,REST API",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "demo_url": "https://supportdesk-crm.vercel.app",
        "repo_url": "https://github.com/shailendra-prajapati-03",
        "featured": True,
        "sort_order": 3,
    },
    {
        "slug": "ai-lead-validation",
        "title": "AI Lead Validation Automation",
        "description": "Automated lead-validation workflow built in n8n that validates incoming leads, enriches data, filters invalid or duplicate entries, and sends automatic notifications. It reduces manual effort, improves lead quality, and streamlines the sales process through intelligent automation — with AI-powered verification, Gmail alerts, Google Sheets sync, webhook triggers, and error-handling/retry logic.",
        "tags": "n8n,AI Automation,Webhooks",
        "image": "/projects/ai-lead-validation.png",
        "demo_url": None,
        "repo_url": "https://github.com/shailendra-prajapati-03",
        "featured": True,
        "sort_order": 4,
    },
]


def seed() -> None:
    init_db()
    with Session(engine) as session:
        created = 0
        for data in SEED_PROJECTS:
            existing = session.exec(
                select(Project).where(Project.slug == data["slug"])
            ).first()
            if existing:
                continue
            session.add(Project(**data))
            created += 1
        session.commit()
        print(f"Seeding complete. {created} new project(s) added.")


if __name__ == "__main__":
    seed()
