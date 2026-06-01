export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Parcel Tracker</h1>
      <p className="text-gray-600">
        Track your parcel, view delivery status, and manage shipments.
      </p>

      <div className="space-y-3">
        <a href="/track/ABC123" className="block p-4 bg-white shadow rounded">
          Track a Parcel
        </a>
        <a href="/dashboard" className="block p-4 bg-white shadow rounded">
          Sender Dashboard
        </a>
        <a href="/courier" className="block p-4 bg-white shadow rounded">
          Courier Portal
        </a>
        <a href="/admin" className="block p-4 bg-white shadow rounded">
          Admin Analytics
        </a>
      </div>
    </div>
  );
}
