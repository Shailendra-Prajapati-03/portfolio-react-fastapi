"""Application configuration loaded from environment variables."""

from functools import lru_cache

from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
        populate_by_name=True,
    )

    app_name: str = "Portfolio API"
    environment: str = "development"
    database_url: str = "sqlite:///./portfolio.db"

    # CORS — comma-separated string in the env, parsed into a list below.
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    # Regex for origins to allow in addition to the exact list above.
    # Default covers all Vercel deployments (production + rotating previews).
    cors_origin_regex: str = r"https://.*\.vercel\.app"

    # --- SMTP / email ---
    # Each field accepts a couple of common env-var names so credentials
    # configured on Render under EITHER convention are picked up. This is the
    # #1 production footgun: setting SMTP_USERNAME/EMAIL_FROM/EMAIL_TO while the
    # code only read SMTP_USER/SMTP_FROM/CONTACT_RECEIVER silently disabled email.
    smtp_host: str = Field(
        default="",
        validation_alias=AliasChoices("smtp_host", "email_host"),
    )
    smtp_port: int = Field(
        default=587,
        validation_alias=AliasChoices("smtp_port", "email_port"),
    )
    smtp_user: str = Field(
        default="",
        validation_alias=AliasChoices(
            "smtp_user", "smtp_username", "email_host_user", "email_user"
        ),
    )
    smtp_password: str = Field(
        default="",
        validation_alias=AliasChoices(
            "smtp_password", "smtp_pass", "email_host_password", "email_password"
        ),
    )
    smtp_from: str = Field(
        default="",
        validation_alias=AliasChoices("smtp_from", "email_from"),
    )
    contact_receiver: str = Field(
        default="shailendraprajapati640@gmail.com",
        validation_alias=AliasChoices("contact_receiver", "email_to", "contact_email"),
    )
    # Use an implicit-SSL connection (port 465). STARTTLS (587) is the default.
    smtp_use_ssl: bool = Field(
        default=False,
        validation_alias=AliasChoices("smtp_use_ssl", "email_use_ssl"),
    )

    # --- Resend (HTTP email API over port 443) ---
    # Preferred on hosts that block outbound SMTP (e.g. Render's free tier,
    # which raises "Network is unreachable" on smtp.gmail.com). When set, this
    # takes priority over SMTP. Delivers to CONTACT_RECEIVER; no domain needed
    # if you send to the same address you signed up to Resend with.
    resend_api_key: str = Field(default="", validation_alias=AliasChoices("resend_api_key"))
    resend_from: str = Field(
        default="Portfolio <onboarding@resend.dev>",
        validation_alias=AliasChoices("resend_from"),
    )

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]

    @property
    def smtp_password_clean(self) -> str:
        """Gmail App Passwords are shown in space-separated groups but must be
        sent without spaces. Strip them defensively so a pasted-with-spaces
        password on Render still authenticates."""
        return self.smtp_password.replace(" ", "")

    @property
    def mail_from(self) -> str:
        """The From address. Falls back to the authenticated user, which Gmail
        requires (it rejects a From that isn't the account or an alias)."""
        return self.smtp_from or self.smtp_user

    @property
    def smtp_configured(self) -> bool:
        return bool(self.smtp_host and self.smtp_user and self.smtp_password)

    @property
    def email_provider(self) -> str | None:
        """Which transport to use. Resend (HTTPS) wins because it works on hosts
        that block outbound SMTP; SMTP is the fallback for local dev."""
        if self.resend_api_key:
            return "resend"
        if self.smtp_configured:
            return "smtp"
        return None

    @property
    def missing_email_vars(self) -> list[str]:
        """What's needed to enable delivery, if nothing is configured yet."""
        if self.email_provider is not None:
            return []
        # Nothing configured — SMTP is blocked on some hosts, so recommend Resend.
        return [
            "RESEND_API_KEY (recommended on Render — HTTPS, no blocked ports)",
            "or SMTP_HOST + SMTP_USER + SMTP_PASSWORD (needs a host that allows SMTP)",
        ]

    @property
    def email_enabled(self) -> bool:
        return self.email_provider is not None

    @property
    def email_required(self) -> bool:
        """In production a non-sending contact form is a real bug, so failures
        are surfaced as errors rather than swallowed."""
        return self.environment.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
