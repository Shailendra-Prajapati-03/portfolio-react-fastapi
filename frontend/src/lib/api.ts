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

// Formspree handles email delivery over HTTPS (port 443), so it works on hosts
// that block outbound SMTP (e.g. Render's free tier). Public endpoint — safe to
// ship in the client bundle. Overridable via env for different environments.
const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xyzkjvql";

/** Best-effort: persist the message in our own backend DB. Never blocks or
 * fails the user-facing submit — email delivery is Formspree's job. */
function saveToBackend(payload: ContactPayload): void {
  fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    /* backend may be asleep/unavailable — the email still went via Formspree */
  });
}

/** Send a contact message. Email is delivered by Formspree; the backend DB
 * save is fired in the background and does not affect the result. */
export async function sendContactMessage(
  payload: ContactPayload
): Promise<ApiResult<{ id: number }>> {
  void saveToBackend(payload);

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        _replyto: payload.email,
      }),
    });

    if (res.ok) {
      return { ok: true, data: { id: 0 } };
    }

    // Formspree returns { errors: [{ field, message }] } on failure.
    const body = await res.json().catch(() => ({}));
    const errors = (body as { errors?: { message?: string }[] }).errors;
    const message =
      Array.isArray(errors) && errors.length
        ? errors.map((e) => e.message).filter(Boolean).join(" ")
        : `Could not send your message (${res.status}). Please try again.`;
    return { ok: false, error: message };
  } catch {
    return {
      ok: false,
      error: "Could not reach the mail service. Please try again later.",
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
