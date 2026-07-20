import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movez.AI — Interactive Discovery",
  description:
    "Interactive discovery reimagined. Movez AI plus the full product experience.",
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
