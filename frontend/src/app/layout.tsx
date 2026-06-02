/* frontend/src/app/layout.tsx */

import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "HyperTrace - Real-Time Parcel Tracking & Notifications",
    template: "%s | HyperTrace", // This allows child pages to set their own title like "Dashboard | HyperTrace"
  },
  description: "Bridge the gap between senders, couriers, and receivers. Real-time parcel tracking, instant notifications, and full delivery transparency.",
  keywords: ["parcel tracking", "real-time delivery", "courier portal", "shipment tracking", "HyperTrace", "logistics"],
  openGraph: {
    title: "HyperTrace - Real-Time Parcel Tracking",
    description: "End the black box of parcel delivery. Track shipments, update statuses, and notify receivers instantly.",
    url: "https://hypertrace.app", // Placeholder
    siteName: "HyperTrace",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HyperTrace - Real-Time Parcel Tracking",
    description: "End the black box of parcel delivery. Track shipments, update statuses, and notify receivers instantly.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-950">
        {/* Glassmorphism Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <a href="/" className="flex items-center gap-2" aria-label="Home">
                <span className="text-2xl animate-float">📦</span>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  HyperTrace
                </span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="/track" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Track</a>
                <a href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sender</a>
                <a href="/courier" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Courier</a>
                <a href="/admin" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Admin</a>
              </div>
              
              {/* Mobile Menu Button (Placeholder for future enhancement) */}
              <div className="md:hidden flex items-center">
                <button className="text-gray-400 hover:text-white focus:outline-none" aria-label="Menu">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                © 2024 HyperTrace. All rights reserved.
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}