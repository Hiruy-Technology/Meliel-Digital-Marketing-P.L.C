import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

// Labelled form fields with accessible error messages. 16px text stops iPhones zooming in on focus.

const control =
  "mt-2 block w-full rounded-sm border bg-raised px-4 text-base text-ink aria-invalid:border-red aria-invalid:border-2";

type FieldShellProps = {
  id: string;
  label: string;
  /** The "(optional)" wording, when the field is optional. */
  optional?: string;
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
      <label htmlFor={id} className="font-medium text-ink">
        {label}
        {optional && (
          <span className="font-normal text-ink-muted"> {optional}</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-ink-muted">
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
        className={clsx(control, "h-12 border-control")}
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
        className={clsx(control, "border-control py-3")}
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
        className={clsx(control, "h-12 border-control")}
        {...input}
      >
        {children}
      </select>
    </FieldShell>
  );
}
