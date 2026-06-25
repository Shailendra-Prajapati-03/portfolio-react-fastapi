import type { Project } from "../data/content";
import { projects as fallbackProjects } from "../data/content";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

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
        error: body.detail ?? `Request failed (${res.status})`,
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
