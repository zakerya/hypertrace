import "./globals.css";

export const metadata = {
  title: "Parcel Tracker",
  description: "Track parcels in real-time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-4xl mx-auto py-10">{children}</div>
      </body>
    </html>
  );
}
