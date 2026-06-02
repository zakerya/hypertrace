/* frontend/src/app/dashboard/page.tsx */

export default function Dashboard() {
  // Mock data for the dashboard - we'll replace this with Go backend data later
  const metrics = [
    { title: "Total Shipments", value: "124", icon: "📦", change: "+12%", color: "text-blue-400" },
    { title: "In Transit", value: "38", icon: "🚚", change: "+4%", color: "text-yellow-400" },
    { title: "Delivered", value: "82", icon: "✅", change: "+8%", color: "text-green-400" },
    { title: "Pending Pickup", value: "4", icon: "⏳", change: "-2%", color: "text-purple-400" },
  ];

  const shipments = [
    { id: "HTC-89012", receiver: "Alice Johnson", status: "In Transit", date: "Oct 24, 2024" },
    { id: "HTC-78432", receiver: "Bob Smith", status: "Delivered", date: "Oct 23, 2024" },
    { id: "HTC-11234", receiver: "Charlie Brown", status: "Pending Pickup", date: "Oct 25, 2024" },
    { id: "HTC-55667", receiver: "Diana Prince", status: "In Transit", date: "Oct 24, 2024" },
    { id: "HTC-99001", receiver: "Evan Wright", status: "Delivered", date: "Oct 22, 2024" },
  ];

  // Helper function to color-code the status badges
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Transit":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Pending Pickup":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-gray-400 mt-1">Monitor your shipments and delivery performance.</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 animate-glow">
          + Create Shipment
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div 
            key={metric.title} 
            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: `${0.1 * (index + 1)}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{metric.icon}</span>
              <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-md">{metric.change}</span>
            </div>
            <h3 className={`text-3xl font-bold ${metric.color}`}>{metric.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Shipments List */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Recent Shipments</h2>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All →</button>
        </div>
        
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-4 gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-white/5 bg-white/[0.02]">
          <span>Tracking ID</span>
          <span>Receiver</span>
          <span>Status</span>
          <span className="text-right">Date</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {shipments.map((shipment) => (
            <div 
              key={shipment.id} 
              className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <div className="font-mono text-sm text-blue-400 font-medium">{shipment.id}</div>
              <div className="text-sm text-gray-300">{shipment.receiver}</div>
              <div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusClasses(shipment.status)}`}>
                  {shipment.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 md:text-right">{shipment.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}