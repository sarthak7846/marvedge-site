import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marvedge",
  description: "Get started by marvedging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
