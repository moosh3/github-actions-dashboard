import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// Import new components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TelemetryDashboard from "./components/TelemetryDashboard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ActionEye Dashboard",
  description: "Job Telemetry Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <TelemetryDashboard />
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
