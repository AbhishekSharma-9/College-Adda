'use client';

import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [role, setRole] = useState('VERIFIED');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [mounted, setMounted] = useState(false);

  // Check for existing session on mount (Supabase Persistence)
  useEffect(() => {
    setMounted(true);
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkUser();
  }, [router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
          role: role,
        }
      }
    });

    if (error) {
      setError(error.message);
      return;
    }

    setSuccessMsg('Account created! Please check your email to verify.');
    if (data.session) router.push('/dashboard'); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginEmail || !loginPassword) {
      setError('Please enter email and password');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      setError('Invalid credentials. Please try again.');
      return;
    }

    router.push('/dashboard');
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!loginEmail) {
      setError('Please enter your email address above first.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(loginEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccessMsg('Password reset link sent to your email!');
    }
  };

  // Real Supabase OAuth Login/Signup
  const handleSocialAuth = async (provider) => {
    setError('');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider.toLowerCase(),
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      }
    });

    if (error) setError(error.message);
  };

  // RESTORED: Guest Login Logic
  const handleGuestLogin = () => {
    // Routes to dashboard and passes a flag so the dashboard knows to hide upload buttons!
    router.push('/dashboard?role=guest');
  };

  const particles = [
    { id: 1, top: '10%', left: '15%', duration: '8s', delay: '0s', size: '3px' },
    { id: 2, top: '20%', left: '75%', duration: '12s', delay: '1s', size: '2px' },
    { id: 3, top: '35%', left: '45%', duration: '10s', delay: '2s', size: '4px' },
    { id: 4, top: '50%', left: '85%', duration: '7s', delay: '0.5s', size: '2px' },
    { id: 5, top: '65%', left: '25%', duration: '14s', delay: '1.5s', size: '3px' },
    { id: 6, top: '75%', left: '60%', duration: '9s', delay: '3s', size: '2px' },
    { id: 7, top: '85%', left: '10%', duration: '11s', delay: '2.5s', size: '4px' },
  ];

  if (!mounted) return null;

  // Social Auth Buttons Component (Now includes Google, GitHub, and LinkedIn)
  const SocialButtons = () => (
    <div className="grid grid-cols-3 gap-2 mb-2">
      <button type="button" onClick={() => handleSocialAuth('google')} className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-lg transition text-white text-sm">
        <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
      </button>
      <button type="button" onClick={() => handleSocialAuth('github')} className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-lg transition text-white text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/></svg>
      </button>
      <button type="button" onClick={() => handleSocialAuth('linkedin')} className="flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-purple-500/30 rounded-lg transition text-white text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      </button>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f0c20]">
      {/* Breathing Neon Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none animate-hue-breathe">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/40 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{ width: particle.size, height: particle.size, top: particle.top, left: particle.left, animation: `float ${particle.duration} ease-in-out infinite ${particle.delay}` }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-black tracking-tight text-white pb-1 animate-hue-text">
              College Adda
            </h1>
            <p className="text-gray-300 mt-2 text-sm uppercase tracking-widest font-semibold">Next-Gen Resources Share Hub</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-[0_0_40px_rgba(236,72,153,0.15)] animate-hue-shadow">
            
            <div className="flex gap-3 mb-5 bg-black/30 p-1 rounded-xl">
              <button onClick={() => { setIsLogin(true); setIsForgotPassword(false); }} className={`flex-1 py-2 rounded-lg transition-all text-sm font-bold ${isLogin && !isForgotPassword ? 'bg-white/10 text-white shadow-lg border border-white/20' : 'text-gray-400 hover:text-white'}`}>
                Sign In
              </button>
              <button onClick={() => { setIsLogin(false); setIsForgotPassword(false); }} className={`flex-1 py-2 rounded-lg transition-all text-sm font-bold ${!isLogin && !isForgotPassword ? 'bg-white/10 text-white shadow-lg border border-white/20' : 'text-gray-400 hover:text-white'}`}>
                Sign Up
              </button>
            </div>

            {error && <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs text-center font-medium">{error}</div>}
            {successMsg && <div className="mb-4 p-2 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-xs text-center font-medium">{successMsg}</div>}

            {isForgotPassword ? (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <p className="text-gray-400 text-sm text-center mb-2">Enter your email to receive a password reset link.</p>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Email address" />
                <button type="submit" className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-bold text-sm transition-all shadow-lg">Send Reset Link</button>
                <button type="button" onClick={() => setIsForgotPassword(false)} className="w-full text-xs text-gray-400 hover:text-white mt-2">Back to Login</button>
              </form>
            ) : isLogin ? (
              <>
                <form onSubmit={handleLogin} className="space-y-3">
                  <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Email address" />
                  <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Password" />
                  
                  <div className="flex justify-end">
                    <button type="button" onClick={() => setIsForgotPassword(true)} className="text-xs text-gray-400 hover:text-white transition-colors">Forgot Password?</button>
                  </div>

                  <button type="submit" className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-bold text-sm transition-all shadow-lg">Sign In</button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#130f26] text-gray-400">Or continue with</span></div>
                </div>

                <SocialButtons />
                
                {/* RESTORED: Guest Login Button */}
                <div className="text-center mt-4">
                  <button onClick={handleGuestLogin} type="button" className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
                    Continue as Guest →
                  </button>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={handleSignup} className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Full name" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Email address" />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-900/60 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-gray-500" placeholder="Password" />
                  
                  <div className="flex gap-4 py-2 justify-center">
                    <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                      <input type="radio" value="VERIFIED" checked={role === 'VERIFIED'} onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-pink-500 bg-gray-900 border-gray-600" />
                      <span>Verified User</span>
                    </label>
                    <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                      <input type="radio" value="ADMIN" checked={role === 'ADMIN'} onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-pink-500 bg-gray-900 border-gray-600" />
                      <span>ADMIN</span>
                    </label>
                  </div>

                  <button type="submit" className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-bold text-sm transition-all shadow-lg">Create Account</button>
                </form>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                  <div className="relative flex justify-center text-xs"><span className="px-3 bg-[#130f26] text-gray-400">Or sign up with</span></div>
                </div>

                <SocialButtons />
                
                {/* RESTORED: Guest Login Button */}
                <div className="text-center mt-4">
                  <button onClick={handleGuestLogin} type="button" className="text-xs text-gray-400 hover:text-white transition-colors font-medium">
                    Continue as Guest →
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Built by Karlo Sharma</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        @keyframes hueBreathe {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(120deg); }
        }
        .animate-hue-breathe {
          animation: hueBreathe 15s infinite alternate ease-in-out;
        }
        .animate-hue-text {
          background: linear-gradient(to right, #ec4899, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 200% auto;
          animation: hueBreathe 15s infinite alternate ease-in-out, textShine 3s linear infinite;
        }
        @keyframes textShine {
          to { background-position: 200% center; }
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />
    </div>
  );
}