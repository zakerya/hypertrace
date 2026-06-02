/* frontend/src/app/page.tsx */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [trackingId, setTrackingId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <div className="space-y-32">
      
      {/* ======================== */}
      {/* HERO SECTION             */}
      {/* ======================== */}
      <section className="text-center space-y-8 pt-20 relative">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white animate-fade-in-up">
            End the Black Box of <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Parcel Delivery
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            When a parcel leaves your hands, visibility shouldn&apos;t end. HyperTrace bridges the gap between senders, couriers, and receivers with real-time updates and instant notifications.
          </p>

          {/* Glowing Track Input */}
          <form onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-3 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <input 
              type="text" 
              placeholder="Enter tracking number (e.g. HTC-89012)..." 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all backdrop-blur-md text-base"
            />
            <button type="submit" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 animate-glow">
              Track
            </button>
          </form>
        </div>
      </section>

      {/* ======================== */}
      {/* PROBLEM/SOLUTION SECTION */}
      {/* ======================== */}
      <section className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">The Problem</span>
          <h2 className="text-4xl font-extrabold text-white mt-3">The Delivery Blind Spot</h2>
          <p className="text-gray-400 mt-4 text-lg leading-relaxed">
            You hand over your parcel. The courier knows they have it. But the receiver? They&apos;re left in the dark. And you have no way of knowing if it actually arrived. Traditional tracking is fragmented, leaving everyone guessing.
          </p>
        </div>

        <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">Total Transparency, Zero Guesswork</h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              HyperTrace creates a single source of truth. Senders get peace of mind, couriers get streamlined workflows, and receivers get the real-time visibility they deserve.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* FEATURES SECTION         */}
      {/* ======================== */}
      <section className="relative z-10">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="text-4xl font-extrabold text-white mt-3">Why Choose HyperTrace?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="text-4xl mb-5">🔔</div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Notifications</h3>
            <p className="text-gray-400 leading-relaxed">
              The moment a parcel is picked up, in transit, or delivered, all parties are notified. No more &ldquo;Did it arrive?&rdquo; text messages.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-4xl mb-5">📍</div>
            <h3 className="text-xl font-bold text-white mb-3">Real-Time Tracking</h3>
            <p className="text-gray-400 leading-relaxed">
              Anyone with a tracking ID can see the exact status and location history of their shipment. Transparency builds trust.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="text-4xl mb-5">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Business Intelligence</h3>
            <p className="text-gray-400 leading-relaxed">
              Monitor delivery success rates, average transit times, and courier performance from your centralized dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* HOW IT WORKS SECTION     */}
      {/* ======================== */}
      <section className="relative z-10">
        <div className="text-center mb-16">
          <span className="text-green-400 font-semibold text-sm uppercase tracking-widest">Process</span>
          <h2 className="text-4xl font-extrabold text-white mt-3">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-green-500/50"></div>
          
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="w-24 h-24 mx-auto bg-blue-500/20 border-2 border-blue-500/50 rounded-full flex items-center justify-center text-4xl mb-6 relative z-10">
              📤
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Ship & Share</h3>
            <p className="text-gray-400">Create a shipment and instantly share the tracking ID with your receiver.</p>
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="w-24 h-24 mx-auto bg-purple-500/20 border-2 border-purple-500/50 rounded-full flex items-center justify-center text-4xl mb-6 relative z-10">
              🚚
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Scan & Update</h3>
            <p className="text-gray-400">Couriers scan the parcel at every checkpoint. Statuses update in real time.</p>
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="w-24 h-24 mx-auto bg-green-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center text-4xl mb-6 relative z-10">
              📥
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Track & Receive</h3>
            <p className="text-gray-400">Receivers watch the journey live and get notified the second it arrives.</p>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* PORTALS SECTION          */}
      {/* ======================== */}
      <section className="relative z-10 space-y-10">
        <div className="text-center">
          <span className="text-pink-400 font-semibold text-sm uppercase tracking-widest">Access</span>
          <h2 className="text-4xl font-extrabold text-white mt-3">Ready to Take Control?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Sender Card */}
          <a href="/dashboard" className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">👤</div>
            <h3 className="text-xl font-bold text-white mb-3">Sender Dashboard</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Create shipments, track delivery status, and know exactly when your parcel reaches its destination.</p>
            <span className="text-blue-400 font-semibold text-sm group-hover:underline">Go to Dashboard →</span>
          </a>

          {/* Courier Card */}
          <a href="/courier" className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-green-500/50 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">🚚</div>
            <h3 className="text-xl font-bold text-white mb-3">Courier Portal</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Scan pickups, update transit statuses, and confirm deliveries in real-time.</p>
            <span className="text-green-400 font-semibold text-sm group-hover:underline">Go to Portal →</span>
          </a>

          {/* Admin Card */}
          <a href="/admin" className="group bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:-translate-y-2 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">📊</div>
            <h3 className="text-xl font-bold text-white mb-3">Admin Analytics</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Overview of all operations, performance metrics, and delivery success rates.</p>
            <span className="text-purple-400 font-semibold text-sm group-hover:underline">View Analytics →</span>
          </a>

        </div>
      </section>

    </div>
  );
}