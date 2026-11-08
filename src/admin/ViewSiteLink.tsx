// "View website" at the top of the nav (admin.components.beforeNavLinks), opening the public
// site in a new tab so the editor keeps their place here.
export default function ViewSiteLink() {
  return (
    <a
      className="meliel-view-site"
      href="/"
      target="_blank"
      rel="noopener noreferrer"
    >
      View website
      <span className="sr-only"> (opens in a new tab)</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        <path d="M11 13l9-9" />
        <path d="M15 4h5v5" />
      </svg>
    </a>
  );
}
