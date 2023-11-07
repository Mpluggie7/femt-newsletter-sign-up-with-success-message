import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Mentor | Newsletter sign-up form with success message",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./assets/images/favicon-32x32.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
