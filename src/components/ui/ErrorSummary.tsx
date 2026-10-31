import type { Ref } from "react";

type ErrorSummaryProps = {
  /** Message per field, from `fieldErrors()`. */
  errors: Record<string, string>;
  /** Field name → input id, in page order. */
  fields: Record<string, { id: string }>;
  ref?: Ref<HTMLDivElement>;
};

// Lists every problem at the top of a form, in page order, with links to the fields.
// Forms move keyboard focus here after a failed submit, so everyone finds it.
export function ErrorSummary({ errors, fields, ref }: ErrorSummaryProps) {
  const keys = Object.keys(fields).filter((key) => errors[key]);
  if (keys.length === 0) return null;
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className="rounded-sm border-2 border-red bg-raised p-5"
    >
      <p className="font-display font-semibold text-red">
        Please check{" "}
        {keys.length === 1 ? "this field" : `these ${keys.length} fields`}
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-red">
        {keys.map((key) => (
          <li key={key}>
            <a
              href={`#${fields[key].id}`}
              className="underline underline-offset-2"
            >
              {errors[key]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
