"""FastAPI application entrypoint."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.util import get_remote_address

from .config import settings
from .database import init_db
from .routers import contact, projects

logging.basicConfig(level=logging.INFO)

# Basic rate limiting (per client IP) to protect the contact endpoint.
limiter = Limiter(key_func=get_remote_address, default_limits=["100/hour"])


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Backend API for the Shailendra Prajapati portfolio.",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    # Also allow Vercel preview deployments (rotating *.vercel.app subdomains),
    # which an exact-match list cannot cover. Configurable via CORS_ORIGIN_REGEX.
    allow_origin_regex=settings.cors_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["health"])
def root() -> dict:
    return {"status": "ok", "service": settings.app_name, "version": "1.0.0"}


@app.get("/health", tags=["health"])
def health() -> dict:
    return {"status": "healthy"}


# Apply a stricter limit to the contact POST specifically.
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    logging.exception("Unhandled error on %s", request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."},
    )


app.include_router(contact.router)
app.include_router(projects.router)
