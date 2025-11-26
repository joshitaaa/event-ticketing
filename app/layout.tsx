import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Ticketing - Secure Tickets with Anti-Fraud Protection",
  description: "Buy event tickets with secure payment processing and one-time entry validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
