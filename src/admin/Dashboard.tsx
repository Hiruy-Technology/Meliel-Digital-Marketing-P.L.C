import clsx from "clsx";
import Link from "next/link";
import type { ServerProps } from "payload";
import { isAdmin } from "@/collections/access";

// The top of the dashboard (admin.components.beforeDashboard): a greeting, the numbers that matter
// day to day, quick actions, the latest inquiries and, for admins, what Site Settings still lacks.
// Every query runs as the signed-in user (overrideAccess: false), so it shows only what they may see.

const ADMIN = "/admin";
const DAY = 24 * 60 * 60 * 1000;

const TYPE_LABEL: Record<string, string> = {
  general: "General",
  quote: "Quote",
};
const EMAIL_LABEL: Record<string, { text: string; tone: string }> = {
  sent: { text: "Emailed", tone: "good" },
  failed: { text: "Email failed", tone: "bad" },
  "not-configured": { text: "Email not set up", tone: "muted" },
};

const date = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Africa/Addis_Ababa",
});

/** The moment n days ago, for "this week" counts. */
function daysAgo(n: number) {
  return new Date(Date.now() - n * DAY).toISOString();
}

function greeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone: "Africa/Addis_Ababa",
    }).format(new Date()),
  );
  return hour < 12
    ? "Good morning"
    : hour < 18
      ? "Good afternoon"
      : "Good evening";
}

type Settings = Record<string, unknown>;
const empty = (v: unknown) =>
  v === null ||
  v === undefined ||
  (typeof v === "string" && v.trim() === "") ||
  (Array.isArray(v) && v.length === 0);

// Site Settings the website needs before launch, in the order they appear in Site Settings.
const CHECKLIST: { field: string; label: string }[] = [
  { field: "phones", label: "Phone numbers" },
  { field: "email", label: "Email address" },
  { field: "whatsappNumber", label: "WhatsApp number" },
  { field: "telegramUsername", label: "Telegram username" },
  { field: "address", label: "Address" },
  { field: "officeHours", label: "Office hours" },
  { field: "mapEmbedUrl", label: "Google Maps location" },
  { field: "socialLinks", label: "Social links" },
  { field: "homepageStats", label: "Home page numbers" },
  { field: "budgetRanges", label: "Budget ranges for the quote form" },
  { field: "timelines", label: "Timelines for the quote form" },
];

export default async function Dashboard({ payload, user }: ServerProps) {
  if (!payload || !user) return null;
  const as = { overrideAccess: false, user } as const;
  const weekAgo = daysAgo(7);

  const [newInquiries, failedEmails, published, drafts, recent] =
    await Promise.all([
      payload.count({
        collection: "inquiries",
        where: { createdAt: { greater_than_equal: weekAgo } },
        ...as,
      }),
      payload.count({
        collection: "inquiries",
        where: { emailStatus: { equals: "failed" } },
        ...as,
      }),
      payload.count({
        collection: "projects",
        where: { status: { equals: "published" } },
        ...as,
      }),
      payload.count({
        collection: "projects",
        where: { status: { equals: "draft" } },
        ...as,
      }),
      payload.find({
        collection: "inquiries",
        sort: "-createdAt",
        limit: 5,
        depth: 0,
        select: {
          name: true,
          type: true,
          locale: true,
          emailStatus: true,
          createdAt: true,
        },
        ...as,
      }),
    ]);

  const admin = isAdmin(user);
  const missing = admin
    ? await payload
        .findGlobal({
          slug: "site-settings",
          depth: 0,
          locale: "en",
          ...as,
        })
        .then((s) =>
          CHECKLIST.filter(({ field }) =>
            empty((s as unknown as Settings)[field]),
          ),
        )
    : [];

  const stats = [
    {
      value: newInquiries.totalDocs,
      label: "New inquiries this week",
      href: `${ADMIN}/collections/inquiries`,
    },
    {
      value: published.totalDocs,
      label: "Published projects",
      href: `${ADMIN}/collections/projects?where[status][equals]=published`,
    },
    {
      value: drafts.totalDocs,
      label: "Draft projects",
      href: `${ADMIN}/collections/projects?where[status][equals]=draft`,
    },
    {
      value: failedEmails.totalDocs,
      label: "Inquiry emails that failed",
      href: `${ADMIN}/collections/inquiries?where[emailStatus][equals]=failed`,
      alert: failedEmails.totalDocs > 0,
    },
  ];

  return (
    <div className="meliel-dash">
      <div className="meliel-dash__hello">
        <div>
          <p className="meliel-dash__eyebrow">Portfolio Manager</p>
          <h1 className="meliel-dash__title">{greeting()}</h1>
          <p className="meliel-dash__user">Signed in as {user.email}</p>
        </div>
        <nav aria-label="Quick actions" className="meliel-dash__actions">
          <Link
            className="meliel-dash__action meliel-dash__action--primary"
            href={`${ADMIN}/collections/projects/create`}
          >
            New project
          </Link>
          <Link
            className="meliel-dash__action"
            href={`${ADMIN}/collections/inquiries`}
          >
            Inquiries
          </Link>
          {admin && (
            <Link
              className="meliel-dash__action"
              href={`${ADMIN}/globals/site-settings`}
            >
              Site settings
            </Link>
          )}
        </nav>
      </div>

      <ul className="meliel-dash__stats">
        {stats.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className={clsx(
                "meliel-dash__stat",
                s.alert && "meliel-dash__stat--alert",
              )}
            >
              <span className="meliel-dash__stat-value">{s.value}</span>
              <span className="meliel-dash__stat-label">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="meliel-dash__panels">
        <section className="meliel-dash__panel" aria-labelledby="meliel-recent">
          <div className="meliel-dash__panel-head">
            <h2 id="meliel-recent">Latest inquiries</h2>
            <Link href={`${ADMIN}/collections/inquiries`}>See all</Link>
          </div>
          {recent.docs.length === 0 ? (
            <p className="meliel-dash__empty">
              No inquiries yet. They appear here as soon as someone sends the
              contact or quote form.
            </p>
          ) : (
            <ul className="meliel-dash__list">
              {recent.docs.map((doc) => {
                const email = doc.emailStatus
                  ? EMAIL_LABEL[doc.emailStatus]
                  : undefined;
                return (
                  <li key={doc.id}>
                    <Link href={`${ADMIN}/collections/inquiries/${doc.id}`}>
                      <span className="meliel-dash__list-main">
                        <strong>{doc.name}</strong>
                        <span>
                          {TYPE_LABEL[doc.type ?? ""] ?? doc.type}
                          {doc.locale === "am" ? " · Amharic" : ""} ·{" "}
                          {date.format(new Date(doc.createdAt))}
                        </span>
                      </span>
                      {email && (
                        <span
                          className={`meliel-pill meliel-pill--${email.tone}`}
                        >
                          {email.text}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {admin && (
          <section
            className="meliel-dash__panel"
            aria-labelledby="meliel-missing"
          >
            <div className="meliel-dash__panel-head">
              <h2 id="meliel-missing">Still missing on the website</h2>
              <Link href={`${ADMIN}/globals/site-settings`}>Site settings</Link>
            </div>
            {missing.length === 0 ? (
              <p className="meliel-dash__empty">
                Every Site Setting is filled in.
              </p>
            ) : (
              <>
                <p className="meliel-dash__note">
                  The website hides these until they&rsquo;re filled in.
                </p>
                <ul className="meliel-dash__checklist">
                  {missing.map((m) => (
                    <li key={m.field}>{m.label}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
