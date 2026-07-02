import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { profile } from "../../data/content";
import { sendContactMessage, type ContactPayload } from "../../lib/api";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

type Status = "idle" | "loading" | "success" | "error";

const contactInfo = [
  { icon: FiMail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    icon: FiPhone,
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
  { icon: FiMapPin, label: "Location", value: profile.location },
];

const initialForm: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update =
    (field: keyof ContactPayload) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const result = await sendContactMessage(form);
    if (result.ok) {
      setStatus("success");
      setFeedback("Thanks! Your message has been sent. I'll get back to you soon.");
      setForm(initialForm);
    } else {
      setStatus("error");
      setFeedback(result.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Let's connect"
      title="Get In Touch"
      subtitle="Have a project in mind or just want to say hi? My inbox is always open."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Info column */}
        <Reveal className="space-y-4">
          {contactInfo.map((info) => {
            const Wrapper = info.href ? "a" : "div";
            return (
              <Wrapper
                key={info.label}
                {...(info.href ? { href: info.href } : {})}
                className="flex items-center gap-4 rounded-2xl border surface p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-brand-400/60 hover:shadow-card"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <info.icon size={19} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted">
                    {info.label}
                  </p>
                  <p className="font-medium [overflow-wrap:anywhere]">
                    {info.value}
                  </p>
                </div>
              </Wrapper>
            );
          })}

          <div className="glass rounded-2xl p-6">
            <p className="font-display text-lg font-semibold">
              Prefer a quick chat?
            </p>
            <p className="mt-2 text-sm text-muted">
              I usually respond within 24 hours. Drop a message and let's build
              something great together.
            </p>
          </div>
        </Reveal>

        {/* Form column */}
        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-6 shadow-card sm:p-7"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                id="name"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                minLength={2}
                maxLength={120}
                required
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="mt-4">
              <Field
                label="Subject"
                id="subject"
                value={form.subject}
                onChange={update("subject")}
                placeholder="What's this about?"
                minLength={2}
                maxLength={200}
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about your project..."
                rows={5}
                minLength={5}
                maxLength={5000}
                required
                className="w-full resize-none rounded-xl border surface px-4 py-3 text-sm outline-none transition-all
                  placeholder:text-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                    status === "success"
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-rose-500/10 text-rose-500"
                  }`}
                >
                  {status === "success" ? (
                    <FiCheckCircle className="shrink-0" />
                  ) : (
                    <FiAlertCircle className="shrink-0" />
                  )}
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

function Field({ label, id, type = "text", ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...rest}
        className="w-full rounded-xl border surface px-4 py-3 text-sm outline-none transition-all
          placeholder:text-muted focus:border-brand-400 focus:ring-2 focus:ring-brand-400/40"
      />
    </div>
  );
}
