// frontend/src/app/docs/page.tsx

export default function DocsPage() {
  return (
    <div className="flex gap-12 animate-fade-in-up">
      
      {/* Sidebar Navigation (Sticky on Desktop) */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Documentation</p>
          <a href="#introduction" className="block text-sm text-gray-400 hover:text-white transition-colors">Introduction</a>
          <a href="#the-problem" className="block text-sm text-gray-400 hover:text-white transition-colors">The Problem</a>
          <a href="#core-concepts" className="block text-sm text-gray-400 hover:text-white transition-colors">Core Concepts</a>
          <a href="#tracking-lifecycle" className="block text-sm text-gray-400 hover:text-white transition-colors">Tracking Lifecycle</a>
          <a href="#api-reference" className="block text-sm text-gray-400 hover:text-white transition-colors">API Reference</a>
          <a href="#security" className="block text-sm text-gray-400 hover:text-white transition-colors">Security & Rate Limits</a>
        </div>
      </aside>

      {/* Main Content */}
      <article className="flex-1 min-w-0 max-w-3xl space-y-16">
        
        <header className="border-b border-white/10 pb-10">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">HyperTrace Documentation</h1>
          <p className="text-xl text-gray-400 mt-4">
            Everything you need to integrate, track, and manage your logistics pipeline with HyperTrace.
          </p>
        </header>

        {/* INTRODUCTION - Added scroll-mt-24 */}
        <section id="introduction" className="space-y-4 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            HyperTrace is a modern, real-time parcel tracking and logistics API designed to bridge the communication gap between senders, couriers, and receivers. Built with a high-performance Golang backend and a reactive Next.js frontend, HyperTrace provides granular visibility into the supply chain, from the moment a label is created to the final delivery confirmation.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Whether you are an e-commerce business looking to provide transparency to your customers, or a logistics provider needing a unified dashboard for your couriers, HyperTrace offers the infrastructure to make it happen.
          </p>
        </section>

        {/* THE PROBLEM - Added scroll-mt-24 */}
        <section id="the-problem" className="space-y-4 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">The Problem</h2>
          <p className="text-gray-300 leading-relaxed">
            Traditional parcel tracking is fragmented. When a sender hands over a package to a courier, they lose visibility. The courier knows they have it, but the receiver is left in the dark, checking stale status pages. Furthermore, senders rarely know if their package was actually delivered successfully unless they manually follow up.
          </p>
          <p className="text-gray-300 leading-relaxed">
            This "Delivery Blind Spot" leads to increased customer support tickets, lost packages, and a broken trust cycle between businesses and their customers. Legacy tracking systems treat the parcel as a black box between checkpoints.
          </p>
        </section>

        {/* CORE CONCEPTS - Added scroll-mt-24 */}
        <section id="core-concepts" className="space-y-6 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">Core Concepts</h2>
          <p className="text-gray-300 leading-relaxed">
            HyperTrace is built around three primary user roles, each with dedicated interfaces and API access levels:
          </p>
          <div className="space-y-4">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Senders</h3>
              <p className="text-gray-400">Businesses or individuals creating shipments. They use the Sender Dashboard to generate tracking IDs, monitor delivery statuses in real-time, and view analytics on their outbound logistics. They no longer have to wonder if a package arrived.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-green-400 mb-2">Couriers</h3>
              <p className="text-gray-400">The logistics providers moving the parcels. Couriers use the mobile-optimized Courier Portal to scan tracking IDs and update the parcel's milestone status and location instantly. This data immediately propagates to the sender and receiver.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-purple-400 mb-2">Receivers</h3>
              <p className="text-gray-400">The end customers waiting for their parcels. Receivers can use the public tracking page to view the full, detailed lifecycle of their shipment without needing an account. They see exactly where their package is and when it will arrive.</p>
            </div>
          </div>
        </section>

        {/* TRACKING LIFECYCLE - Added scroll-mt-24 */}
        <section id="tracking-lifecycle" className="space-y-6 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">The Tracking Lifecycle</h2>
          <p className="text-gray-300 leading-relaxed">
            Unlike basic tracking that only shows "In Transit" or "Delivered", HyperTrace implements a 14-step milestone system. This granular approach ensures that a package is never in a "black box" state. The lifecycle is categorized into four distinct phases:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">1. Preparation Phase</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                <li><strong className="text-gray-200">Label Created:</strong> The tracking ID is generated and the shipment is registered in the system.</li>
                <li><strong className="text-gray-200">Items Sorted:</strong> The items have been picked and sorted for packaging.</li>
                <li><strong className="text-gray-200">Items Packed:</strong> The parcel is boxed, sealed, and ready for handoff.</li>
                <li><strong className="text-gray-200">Left Sender Facility:</strong> The package has left the origin warehouse or office.</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">2. Local Courier & Hub Phase</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                <li><strong className="text-gray-200">Received by Courier:</strong> The local courier has physically scanned and accepted the package.</li>
                <li><strong className="text-gray-200">Arrived at Origin Hub:</strong> The package has reached the initial sorting facility.</li>
                <li><strong className="text-gray-200">Departed Origin Hub:</strong> The package is in transit to the next major node (usually an airport).</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">3. Air & International Transit Phase</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                <li><strong className="text-gray-200">Arrived at Airport:</strong> The parcel is at the origin airport awaiting flight loading.</li>
                <li><strong className="text-gray-200">Departed Airport:</strong> The parcel is currently in the air en route to the destination region.</li>
                <li><strong className="text-gray-200">Arrived at Destination Airport:</strong> The flight has landed and the parcel is ready for customs/processing.</li>
                <li><strong className="text-gray-200">Customs Clearance:</strong> The parcel is undergoing international customs processing (if applicable).</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">4. Final Mile Phase</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-4">
                <li><strong className="text-gray-200">Arrived at Destination Hub:</strong> The parcel has reached the final local sorting center.</li>
                <li><strong className="text-gray-200">Out for Delivery:</strong> The parcel is on the delivery vehicle and will arrive shortly.</li>
                <li><strong className="text-gray-200">Delivered:</strong> The parcel has been successfully delivered and signed for.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API REFERENCE - Added scroll-mt-24 */}
        <section id="api-reference" className="space-y-6 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">API Reference</h2>
          <p className="text-gray-300 leading-relaxed">
            HyperTrace provides a RESTful JSON API for integrating parcel management directly into your own systems. The base URL for the API is <code className="bg-white/10 px-2 py-1 rounded text-blue-300 text-sm">http://localhost:8080/api/v1</code> (update this for production).
          </p>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded border border-green-500/30">GET</span>
                <code className="text-white font-mono text-sm">/api/v1/parcels</code>
              </div>
              <p className="text-gray-400 mb-4">Retrieves a list of all parcels in the system, including their full status history and current milestone.</p>
              <p className="text-xs text-gray-500">Requires: Valid CORS origin.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded border border-blue-500/30">POST</span>
                <code className="text-white font-mono text-sm">/api/v1/parcels</code>
              </div>
              <p className="text-gray-400 mb-4">Creates a new shipment. Automatically sets the status to "Label Created" and initializes the status history timeline.</p>
              <p className="text-xs text-gray-500">Requires: <code className="text-gray-400">sender_name</code>, <code className="text-gray-400">receiver_name</code>, <code className="text-gray-400">receiver_email</code>, <code className="text-gray-400">origin</code>, <code className="text-gray-400">destination</code>, <code className="text-gray-400">estimated_delivery</code>.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded border border-yellow-500/30">PUT</span>
                <code className="text-white font-mono text-sm">/api/v1/parcels/status?tracking_id=HTC-XXXXX</code>
              </div>
              <p className="text-gray-400 mb-4">Updates the milestone status of a specific parcel. Appends the new status to the parcel's history timeline with a server-side timestamp.</p>
              <p className="text-xs text-gray-500">Requires: <code className="text-gray-400">tracking_id</code> (query param), JSON body with <code className="text-gray-400">status</code> and <code className="text-gray-400">location</code>.</p>
            </div>
          </div>
        </section>

        {/* SECURITY - Added scroll-mt-24 */}
        <section id="security" className="space-y-4 scroll-mt-24">
          <h2 className="text-3xl font-bold text-white border-b border-white/5 pb-3">Security & Rate Limiting</h2>
          <p className="text-gray-300 leading-relaxed">
            HyperTrace is built with security as a foundational principle. The backend leverages Go's strict type system to prevent injection vulnerabilities, and all data validation is strictly enforced on the server side before any database writes occur.
          </p>
          <p className="text-gray-300 leading-relaxed">
            To protect the infrastructure from abuse and DDoS attacks, the API implements a global Rate Limiter. Currently, requests are limited to <strong className="text-white">5 requests per second</strong> with a burst capacity of <strong className="text-white">10 requests</strong>. Exceeding this limit will result in a <code className="bg-white/10 px-2 py-1 rounded text-red-300 text-sm">429 Too Many Requests</code> HTTP response.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Cross-Origin Resource Sharing (CORS) is strictly configured to only accept requests from explicitly whitelisted domains, ensuring that malicious websites cannot hijack your API endpoints.
          </p>
        </section>

      </article>
    </div>
  );
}