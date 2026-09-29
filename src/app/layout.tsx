import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexUS | Autonomous AI & Cloud Command Center",
  description: "Enterprise autonomous AI agent orchestration, real-time workflow telemetry, and neural computing command center.",
  keywords: ["AI agents", "autonomous workflows", "cloud command center", "real-time telemetry", "Nexus"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#06080d" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
