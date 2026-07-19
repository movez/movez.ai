import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discovery will never be the same - Movez.AI",
  description: "Movez AI",
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
