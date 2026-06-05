// frontend/src/app/layout.tsx

import "./globals.css";
import { Metadata } from "next";
import Providers from "./providers"; 
import { Package, Menu } from "lucide-react"; // <-- Added Lucide Icons

export const metadata: Metadata = {
  title: {
    default: "HyperTrace - Real-Time Parcel Tracking & Notifications",
    template: "%s | HyperTrace",
  },
  description: "Bridge the gap between senders, couriers, and receivers. Real-time parcel tracking, instant notifications, and full delivery transparency.",
  keywords: ["parcel tracking", "real-time delivery", "courier portal", "shipment tracking", "HyperTrace", "logistics"],
  openGraph: {
    title: "HyperTrace - Real-Time Parcel Tracking",
    description: "End the black box of parcel delivery. Track shipments, update statuses, and notify receivers instantly.",
    url: "https://hypertrace.app",
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
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        {/* Professional Navbar */}
        <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <a href="/" className="flex items-center gap-2.5" aria-label="Home">
                <Package className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-xl tracking-tight text-white">
                  HyperTrace
                </span>
              </a>
              <div className="hidden md:flex items-center gap-6">
                <a href="/status" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Status</a>
                <a href="/docs" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Docs</a>
                <a href="/track" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Track</a>
                <a href="/dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Dashboard</a>
                <a href="/admin" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Admin</a>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button className="text-gray-400 hover:text-white focus:outline-none" aria-label="Menu">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
         <main className="flex-grow">
          <Providers>
            {/* Changed from max-w-7xl to max-w-[1920px] to utilize full screen width */}
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </div>
          </Providers>
        </main>

        {/* Professional Footer */}
        <footer className="border-t border-gray-800 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Package className="h-4 w-4" />
                <span>© 2024 HyperTrace. All rights reserved.</span>
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