# Portfolio Backend (FastAPI)

Robust Python backend powering the contact form and project showcase.

## Stack
- **FastAPI** — modern, async, auto-documented REST API
- **SQLModel** (SQLAlchemy + Pydantic) — typed ORM models
- **SQLite** by default (swap `DATABASE_URL` for Postgres in production)
- **slowapi** — IP-based rate limiting
- SMTP email notifications (optional)

## Quick start

```bash
cd backend
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env          # edit values as needed

python -m app.seed            # create tables + seed projects
uvicorn app.main:app --reload # http://localhost:8000
```

Interactive API docs: <http://localhost:8000/docs>

## API endpoints

| Method | Path                  | Description                          |
| ------ | --------------------- | ------------------------------------ |
| GET    | `/`                   | Health/info                          |
| GET    | `/health`             | Health check                         |
| GET    | `/api/projects`       | List all projects                    |
| GET    | `/api/projects/{slug}`| Get a single project                 |
| POST   | `/api/projects`       | Create a project (secure in prod)    |
| POST   | `/api/contact`        | Submit a contact message             |
| GET    | `/api/contact`        | List messages (secure in prod)       |

## Notes
- Email sending is **optional**. If SMTP env vars are empty, messages are still
  saved to the database and the request succeeds.
- `GET /api/contact` and `POST /api/projects` are admin-style endpoints — add
  authentication (e.g. an API key dependency or OAuth) before exposing publicly.
- For production: set `ENVIRONMENT=production`, use Postgres, run behind
  `gunicorn -k uvicorn.workers.UvicornWorker`, and restrict `CORS_ORIGINS`.
