import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

// Labelled form fields with accessible error messages. 16px text stops iPhones zooming in on focus.

const control =
  "mt-2 block w-full rounded-sm border bg-white px-4 text-base text-navy-900 aria-invalid:border-red aria-invalid:border-2";

type FieldShellProps = {
  id: string;
  label: string;
  /** Shows "(optional)" after the label. */
  optional?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
};

/** ids for aria-describedby, so screen readers read the hint and error with the field. */
export function describedBy(id: string, hint?: ReactNode, error?: string) {
  return (
    [hint ? `${id}-hint` : "", error ? `${id}-error` : ""]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red">
      {error}
    </p>
  );
}

function FieldShell({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="font-medium text-navy-900">
        {label}
        {optional && (
          <span className="font-normal text-navy-600"> (optional)</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-navy-600">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={id} error={error} />
    </div>
  );
}

type SharedProps = Omit<FieldShellProps, "children">;

export function TextField({
  id,
  label,
  optional,
  hint,
  error,
  ...input
}: SharedProps & ComponentProps<"input">) {
  return (
    <FieldShell {...{ id, label, optional, hint, error }}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
        className={clsx(control, "h-12 border-navy-500")}
        {...input}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  label,
  optional,
  hint,
  error,
  ...input
}: SharedProps & ComponentProps<"textarea">) {
  return (
    <FieldShell {...{ id, label, optional, hint, error }}>
      <textarea
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
        className={clsx(control, "border-navy-500 py-3")}
        {...input}
      />
    </FieldShell>
  );
}

export function SelectField({
  id,
  label,
  optional,
  hint,
  error,
  children,
  ...input
}: SharedProps & ComponentProps<"select">) {
  return (
    <FieldShell {...{ id, label, optional, hint, error }}>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
        className={clsx(control, "h-12 border-navy-500")}
        {...input}
      >
        {children}
      </select>
    </FieldShell>
  );
}
