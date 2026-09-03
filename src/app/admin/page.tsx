"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redirect to the actual dashboard
        router.push("/admin/chats");
        router.refresh(); // Force refresh to apply middleware cookie state
      } else {
        setError("Incorrect password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-black to-neutral-900 px-4 relative overflow-hidden text-white">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full bg-white/5 backdrop-blur-3xl p-10 rounded-[2rem] shadow-2xl border border-white/10 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-accent-gold/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-accent-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.15)]">
          <Lock className="text-accent-gold" size={28} />
        </div>
        
        <h1 className="text-3xl font-serif italic text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Command Center
        </h1>
        <p className="text-center text-sm text-white/50 mb-10 font-light">
          Authenticate to access Art Diaries control panel.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password..."
              className="w-full px-5 py-4 rounded-xl border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-white placeholder-white/30 transition-all backdrop-blur-md"
              required
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-gradient-to-r from-accent-gold to-yellow-600 text-black py-4 rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5"
          >
            {loading ? "Authenticating..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
