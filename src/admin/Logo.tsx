import { Mark } from "./Mark";

// The full logo on the sign-in screens (admin.components.graphics.Logo).
export default function Logo() {
  return (
    <span className="meliel-logo">
      <Mark className="meliel-logo__mark" />
      <span className="meliel-logo__name">
        <strong>Meliel</strong>
        <span>Digital Marketing</span>
      </span>
    </span>
  );
}
