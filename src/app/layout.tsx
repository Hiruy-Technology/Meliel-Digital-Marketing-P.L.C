import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meliel Digital Marketing",
  description: "[PLACEHOLDER: site description, written in step 9]",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
