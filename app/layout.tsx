import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AG-DEsk",
  description: "AG-DEsk Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
