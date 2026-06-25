# Shailendra Prajapati — Premium Developer Portfolio

A modern, world-class rebuild of the original portfolio, engineered with a
**React + TypeScript** frontend and a **FastAPI (Python)** backend.

> Upgraded from the reference site — same essence and flow, dramatically more
> premium in design, motion, performance, and architecture.

---

## ✨ Highlights

- **Modern design system** — refined indigo/cyan palette, glassmorphism, gradient accents
- **Dark / light mode** — system-aware, persisted, no flash-of-wrong-theme
- **Buttery animations** — Framer Motion reveals, staggered entrances, micro-interactions, animated skill bars, typewriter hero, scroll-progress bar
- **Component-driven React** — clean separation: `layout / sections / ui`, data-driven content
- **Advanced project cards** — image zoom, hover action overlay, tag filtering, animated layout
- **Working contact form** — validated end-to-end, persisted to DB, optional email
- **Fully responsive** — mobile → tablet → desktop, accessible (skip link, ARIA, reduced-motion)
- **SEO & performance** — meta/OG tags, JSON-LD, code-splitting, lazy images, font preconnect

---

## 🗂 Project structure

```
portfolio/
├── frontend/                 # React + Vite + TS + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer, ScrollProgress
│   │   │   ├── sections/     # Hero, About, Skills, Qualification, Services, Projects, Contact
│   │   │   └── ui/           # Section, Reveal, ThemeToggle, ProjectCard, Typewriter, ...
│   │   ├── context/          # ThemeContext (dark/light)
│   │   ├── data/             # content.ts — single source of truth
│   │   ├── hooks/            # useScrollSpy
│   │   ├── lib/              # api.ts (backend client), motion.ts (presets)
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── ...config files
│
└── backend/                  # FastAPI + SQLModel
    └── app/
        ├── main.py           # app, CORS, rate limiting, security headers
        ├── config.py         # env-based settings
        ├── database.py       # engine + session
        ├── models.py         # ContactMessage, Project
        ├── schemas.py        # Pydantic validation
        ├── email_utils.py    # SMTP notifications (optional)
        ├── seed.py           # seed initial projects
        └── routers/          # contact.py, projects.py
```

---

## 🚀 Getting started

### 1. Backend (port 8000)

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate    # Windows
# source .venv/bin/activate                        # macOS/Linux
pip install -r requirements.txt
cp .env.example .env
python -m app.seed
uvicorn app.main:app --reload
```

### 2. Frontend (port 5173)

```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_BASE_URL=http://localhost:8000
npm run dev
```

Open <http://localhost:5173>. The frontend works standalone (falls back to local
project data) and automatically uses the backend when it's running.

---

## 🎨 Design recommendations applied

| Area        | Reference site            | This rebuild                                                |
| ----------- | ------------------------- | ---------------------------------------------------------- |
| Visual feel | Flat, template-style      | Premium glassmorphism, gradients, depth & glow             |
| Motion      | Minimal                   | Scroll reveals, stagger, typewriter, animated bars/cards   |
| Theming     | Single theme              | System-aware dark/light with smooth transitions            |
| Hero        | Static text               | Animated badge, gradient name, rotating roles, floating art|
| Projects    | Basic grid                | Filterable cards with hover overlays & image zoom          |
| Architecture| Static HTML/CSS/JS        | Typed React components + FastAPI backend                   |
| Contact     | Front-end only            | Validated, persisted, optional email notifications         |

---

## 🧱 Tech stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Icons, React Helmet Async
**Backend:** FastAPI, SQLModel, Pydantic v2, Uvicorn, SlowAPI, SQLite/Postgres

---

## 📦 Production build

```bash
# Frontend
cd frontend && npm run build      # outputs to dist/

# Backend
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
# or: gunicorn app.main:app -k uvicorn.workers.UvicornWorker
```

Deploy the frontend `dist/` to Vercel/Netlify/GitHub Pages and the backend to
Render/Railway/Fly.io. Set `VITE_API_BASE_URL` to the deployed backend URL and
restrict `CORS_ORIGINS` to the deployed frontend origin.

---

## ✅ Next steps / future scalability

- Add admin authentication for `POST /api/projects` and `GET /api/contact`
- Switch SQLite → Postgres via `DATABASE_URL`
- Add a CMS-style admin dashboard
- Add automated tests (Vitest + pytest) and CI
- Add image optimization / CDN and a real `og-image.png`
```
