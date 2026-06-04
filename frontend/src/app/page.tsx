/* frontend/src/app/page.tsx */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Bell, BarChart3, ArrowRight, ScanLine, MapPin } from "lucide-react";

// --- Pixel Dust Component ---
// --- Pixel Dust Component ---
const PixelDust = () => {
  // Generate 70 random particles
  const particles = Array.from({ length: 70 }).map((_, i) => {
    const size = Math.random() * 3 + 1; 
    const left = Math.random() * 100; 
    const top = Math.random() * 100;
    const delay = Math.random() * 10; 
    const duration = Math.random() * 15 + 10; // Faster: 10s to 25s
    const opacity = Math.random() * 0.5 + 0.2; 
    
    const colors = [
      "rgba(59, 130, 246, 0.8)", 
      "rgba(139, 92, 246, 0.8)", 
      "rgba(255, 255, 255, 0.6)" 
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={i}
        className="absolute rounded-full animate-float-dust"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          opacity: opacity,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          boxShadow: `0 0 ${size * 3}px ${color}`,
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles}
    </div>
  );
};
// ----------------------------

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
    <div className="space-y-32 relative">
      
      {/* Replaced Grid with Pixel Dust! */}
      <PixelDust />

      {/* ======================== */}
      {/* HERO SECTION             */}
      {/* ======================== */}
      <section className="text-center space-y-8 pt-24 relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-8 animate-fade-in-up">
            <Package className="h-4 w-4" />
            <span>Real-time Logistics Infrastructure</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            End the Black Box of <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Parcel Delivery
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mt-6 animate-fade-in-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            When a parcel leaves your hands, visibility shouldn&apos;t end. HyperTrace bridges the gap between senders, couriers, and receivers with real-time updates.
          </p>

          <form onSubmit={handleTrack} className="max-w-xl mx-auto flex gap-3 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <input 
              type="text" 
              placeholder="Enter tracking number (e.g. HTC-89012)..." 
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
            />
            <button type="submit" className="px-6 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
              Track <ArrowRight className="h-4 w-4" />
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
          <h2 className="text-4xl font-bold text-white mt-3 tracking-tight">The Delivery Blind Spot</h2>
          <p className="text-gray-400 mt-4 text-lg leading-relaxed">
            You hand over your parcel. The courier knows they have it. But the receiver? They&apos;re left in the dark. Traditional tracking is fragmented, leaving everyone guessing.
          </p>
        </div>

        <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-2xl font-bold text-white mb-4">Total Transparency, Zero Guesswork</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            HyperTrace creates a single source of truth. Senders get peace of mind, couriers get streamlined workflows, and receivers get the real-time visibility they deserve.
          </p>
        </div>
      </section>

      {/* ======================== */}
      {/* FEATURES SECTION         */}
      {/* ======================== */}
      <section className="relative z-10">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-widest">Features</span>
          <h2 className="text-4xl font-bold text-white mt-3 tracking-tight">Why Choose HyperTrace?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: '0.7s' }}>
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <Bell className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Instant Notifications</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              The moment a parcel is picked up, in transit, or delivered, all parties are notified. No more &ldquo;Did it arrive?&rdquo; text messages.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: '0.8s' }}>
            <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
              <MapPin className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Real-Time Tracking</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Anyone with a tracking ID can see the exact status and location history of their shipment. Transparency builds trust.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up group" style={{ animationDelay: '0.9s' }}>
            <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
              <BarChart3 className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Business Intelligence</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
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
          <span className="text-gray-400 font-semibold text-sm uppercase tracking-widest">Process</span>
          <h2 className="text-4xl font-bold text-white mt-3 tracking-tight">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <div className="w-16 h-16 mx-auto bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <Package className="h-8 w-8 text-gray-300" />
            </div>
            <span className="text-sm font-bold text-blue-400 mb-2 block">Step 1</span>
            <h3 className="text-xl font-semibold text-white mb-2">Ship & Share</h3>
            <p className="text-gray-500 text-sm">Create a shipment and instantly share the tracking ID with your receiver.</p>
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="w-16 h-16 mx-auto bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <ScanLine className="h-8 w-8 text-gray-300" />
            </div>
            <span className="text-sm font-bold text-purple-400 mb-2 block">Step 2</span>
            <h3 className="text-xl font-semibold text-white mb-2">Scan & Update</h3>
            <p className="text-gray-500 text-sm">Couriers scan the parcel at every checkpoint. Statuses update in real time.</p>
          </div>

          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <div className="w-16 h-16 mx-auto bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center mb-6 relative z-10">
              <MapPin className="h-8 w-8 text-gray-300" />
            </div>
            <span className="text-sm font-bold text-green-400 mb-2 block">Step 3</span>
            <h3 className="text-xl font-semibold text-white mb-2">Track & Receive</h3>
            <p className="text-gray-500 text-sm">Receivers watch the journey live and get notified the second it arrives.</p>
          </div>
        </div>
      </section>

      {/* ======================== */}
      {/* PORTALS SECTION          */}
      {/* ======================== */}
      <section className="relative z-10 space-y-10 pb-10">
        <div className="text-center">
          <span className="text-gray-400 font-semibold text-sm uppercase tracking-widest">Access</span>
          <h2 className="text-4xl font-bold text-white mt-3 tracking-tight">Ready to Take Control?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <a href="/dashboard" className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.3s' }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              Sender Dashboard <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">Create shipments, track delivery status, and know exactly when your parcel reaches its destination.</p>
          </a>

          <a href="/courier" className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              Courier Portal <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-green-400" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">Scan pickups, update transit statuses, and confirm deliveries in real-time.</p>
          </a>

          <a href="/admin" className="group bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              Admin Analytics <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">Overview of all operations, performance metrics, and delivery success rates.</p>
          </a>

        </div>
      </section>

    </div>
  );
}