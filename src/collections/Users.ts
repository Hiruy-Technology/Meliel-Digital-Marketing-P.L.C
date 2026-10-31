import type { Access, CollectionConfig, FieldAccess } from "payload";

// People who can sign in to the Portfolio Manager at /admin.
// admin: everything, including managing users. editor: content only (from step 14).

const isAdmin = (user: { role?: string | null } | null | undefined) =>
  user?.role === "admin";

const adminField: FieldAccess = ({ req }) => isAdmin(req.user);

const adminOnly: Access = ({ req }) => isAdmin(req.user);

/** Admins can reach every user; everyone else only their own account. */
const adminOrSelf: Access = ({ req }) => {
  if (isAdmin(req.user)) return true;
  return req.user ? { id: { equals: req.user.id } } : false;
};

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "role", "updatedAt"],
  },
  auth: {
    // Slows down password guessing on the login page.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    create: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: adminOnly,
  },
  hooks: {
    beforeChange: [
      // The very first account has to be an admin, or nobody could manage users.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({
          collection: "users",
          overrideAccess: true,
          req,
        });
        return totalDocs === 0 ? { ...data, role: "admin" } : data;
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      // Only an admin can change a role, so nobody can promote themselves.
      access: { create: adminField, update: adminField },
      admin: {
        description:
          "Admins can manage users. Editors can only manage site content.",
        // Hidden on the first-user screen, where the account always becomes an admin.
        condition: (_data, _siblingData, { user }) => Boolean(user),
      },
    },
  ],
};
