import { useState } from "react";
import { supabase } from "../lib/supabase";

const assetPathPrefix = "/assets";
const bgImage = `${assetPathPrefix}/41640.png`;

interface Props {
  onLogin: () => void;
  onOpenAccount: () => void;
}

export default function WelcomeScreen({ onLogin, onOpenAccount }: Props) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setEmail("");
      setPassword("");
      setShowLoginForm(false);
      onLogin();
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setEmail("");
      setPassword("");
      setFullName("");
      setPhone("");
      setShowSignupForm(false);
      alert("Account created! Please login with your credentials.");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showLoginForm) {
    return (
      <div 
        className="relative flex flex-col w-full h-full overflow-hidden"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        
        {/* Content */}
        <div className="relative flex flex-col gap-8 items-center justify-center flex-1 px-6 z-10">
          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-br from-[#ff5d62] to-[#d60a14] flex items-center justify-center rounded-lg w-10 h-10 shadow-lg">
              <p className="font-black text-2xl text-white">Z</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-extrabold text-lg text-white tracking-wide">ZENITH BANK</p>
              <p className="font-semibold text-[#ff8a8f] text-xs">SIGN IN</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
              required
            />
            {error && <p className="text-red-300 text-sm bg-red-500/20 p-2 rounded">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff5d62] to-[#d60a14] py-3 rounded-lg text-white font-bold hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <button
            onClick={() => setShowLoginForm(false)}
            className="text-white/80 text-sm hover:text-white transition-colors underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  if (showSignupForm) {
    return (
      <div 
        className="relative flex flex-col w-full h-full overflow-y-auto"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        
        {/* Content */}
        <div className="relative flex flex-col gap-8 items-center justify-center flex-1 px-6 py-8 z-10">
          <div className="flex gap-2 items-center">
            <div className="bg-gradient-to-br from-[#ff5d62] to-[#d60a14] flex items-center justify-center rounded-lg w-10 h-10 shadow-lg">
              <p className="font-black text-2xl text-white">Z</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-extrabold text-lg text-white tracking-wide">ZENITH BANK</p>
              <p className="font-semibold text-[#ff8a8f] text-xs">CREATE ACCOUNT</p>
            </div>
          </div>

          <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-[#ff5d62] focus:bg-white/30 transition-all"
              required
            />
            {error && <p className="text-red-300 text-sm bg-red-500/20 p-2 rounded">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ff5d62] to-[#d60a14] py-3 rounded-lg text-white font-bold hover:shadow-lg active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <button
            onClick={() => setShowSignupForm(false)}
            className="text-white/80 text-sm hover:text-white transition-colors underline"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#0a0e17] to-[#1a1f2e] flex flex-col items-start justify-between w-full h-full overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#d60a14] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-[150px] h-[150px] bg-[#d60a14] rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col items-center pt-[32px] px-[24px] w-full relative z-10">
        <div className="flex gap-[10px] items-center">
          <div className="bg-gradient-to-br from-[#ff5d62] to-[#d60a14] flex items-center justify-center rounded-[12px] size-[40px] shadow-lg">
            <p className="font-['Inter:Black'] font-black text-[24px] text-white leading-none">Z</p>
          </div>
          <div className="flex flex-col gap-[2px] items-start">
            <p className="font-['Inter:Extra_Bold'] font-extrabold text-[18px] text-white leading-normal tracking-wide">ZENITH BANK</p>
            <p className="font-['Inter:Semi_Bold'] font-semibold text-[#ff8a8f] text-[10px] leading-normal">EST. 2026</p>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex-1 relative w-full flex items-center justify-center">
        <img alt="" className="absolute inset-0 max-w-none object-cover size-full opacity-90" src={bgImage} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[32px] items-start pb-[48px] px-[24px] w-full relative z-10">
        <div className="flex flex-col gap-[16px] items-start w-full">
          <p className="font-['Inter:Extra_Bold'] font-extrabold text-[36px] text-white w-full leading-tight tracking-tight">
            Banking made{" "}
            <span className="bg-gradient-to-r from-[#ff5d62] to-[#ff383c] bg-clip-text text-transparent">simple</span>
          </p>
          <p className="font-['Inter:Regular'] font-normal leading-[24px] text-[#a0aac0] text-[15px] w-full">
            Secure. Fast. Convenient. Experience modern banking designed around you.
          </p>
        </div>
        <div className="flex flex-col gap-[12px] items-start w-full">
          <button
            onClick={() => setShowLoginForm(true)}
            className="bg-gradient-to-r from-[#ff5d62] to-[#d60a14] flex gap-[8px] h-[54px] items-center justify-center rounded-[28px] w-full cursor-pointer border-0 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
          >
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Login</p>
          </button>
          <button
            onClick={() => setShowSignupForm(true)}
            className="border-2 border-solid border-white flex h-[54px] items-center justify-center rounded-[28px] w-full cursor-pointer bg-transparent hover:bg-white/5 transition-all duration-200 active:scale-95"
          >
            <p className="font-['Inter:Bold'] font-bold text-[16px] text-white">Open an account</p>
          </button>
        </div>
      </div>
    </div>
  );
}
