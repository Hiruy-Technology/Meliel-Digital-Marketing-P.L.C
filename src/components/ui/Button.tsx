import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "outline" | "on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-display font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Orange with navy text: the main call to action. Never white text on orange (fails contrast).
  primary: "bg-orange-500 text-navy-900 hover:bg-orange-400",
  secondary: "bg-navy-900 text-white hover:bg-navy-950",
  outline:
    "border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white",
  // Secondary action on navy sections.
  "on-dark":
    "border-2 border-white/80 text-white hover:bg-white hover:text-navy-900",
};

// Both sizes are at least 44px tall (comfortable touch target).
const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
) {
  return clsx(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...linkProps } = props;
    return (
      <Link className={buttonClasses(variant, size, className)} {...linkProps}>
        {children}
      </Link>
    );
  }

  const {
    variant,
    size,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
