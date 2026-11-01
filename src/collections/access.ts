import type { Access, FieldAccess } from "payload";

// Who can do what in the Portfolio Manager. Anonymous visitors get nothing through /api except media
// files: the website reads content on the server, so drafts and aiNotes can never leak.

export const isAdmin = (user: { role?: string | null } | null | undefined) =>
  user?.role === "admin";

export const adminField: FieldAccess = ({ req }) => isAdmin(req.user);

export const adminOnly: Access = ({ req }) => isAdmin(req.user);

/** Admins and editors. */
export const signedIn: Access = ({ req }) => Boolean(req.user);
