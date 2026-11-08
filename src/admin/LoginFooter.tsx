import Link from "next/link";

// Below the login form (admin.components.afterLogin).
export default function LoginFooter() {
  return (
    <p className="meliel-login-footer">
      <Link href="/">← Back to the website</Link>
    </p>
  );
}
