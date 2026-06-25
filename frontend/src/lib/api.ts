import type { Project } from "../data/content";
import { projects as fallbackProjects } from "../data/content";

// Strip any trailing slash(es) so `${BASE_URL}/api/...` can never produce a
// double slash (e.g. ".../onrender.com//api/projects"), which the backend 404s.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(
  /\/+$/,
  ""
);

// Fail loudly if a production build was shipped without the backend URL,
// instead of silently falling back to localhost (which breaks the live site).
if (import.meta.env.PROD && !import.meta.env.VITE_API_BASE_URL) {
  console.error(
    "VITE_API_BASE_URL is not set — API calls will fall back to localhost and fail in production."
  );
}

/** Normalize a FastAPI error body into a human-readable string. */
function extractError(body: unknown, status: number): string {
  if (body && typeof body === "object" && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    // 422 validation errors arrive as an array of {loc, msg, ...}.
    if (Array.isArray(detail)) {
      const msg = detail
        .map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : ""))
        .filter(Boolean)
        .join(" ");
      if (msg) return msg;
    }
  }
  return `Request failed (${status})`;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiResult<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/** POST a contact message to the FastAPI backend. */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<ApiResult<{ id: number }>> {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        ok: false,
        error: extractError(body, res.status),
      };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch {
    return {
      ok: false,
      error: "Could not reach the server. Please try again later.",
    };
  }
}

/** Fetch projects from the backend, gracefully falling back to local data. */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/projects`);
    if (!res.ok) throw new Error("bad status");
    const data = (await res.json()) as Project[];
    return Array.isArray(data) && data.length ? data : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}
