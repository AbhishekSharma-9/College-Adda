// app/page.js
'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('VERIFIED');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Load users from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@collegeadda.com',
          password: 'admin123',
          role: 'ADMIN',
        },
        {
          id: '2',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'john123',
          role: 'VERIFIED',
        },
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === email)) {
      setError('User already exists with this email');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    setCurrentUser({ name: newUser.name, role: newUser.role });
    setIsLoggedIn(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail || !loginPassword) {
      setError('Please enter email and password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      setCurrentUser({ name: user.name, role: user.role });
      setIsLoggedIn(true);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSocialLogin = (provider) => {
    setCurrentUser({ 
      name: `${provider} User`, 
      role: 'VERIFIED',
      email: `${provider.toLowerCase()}@demo.com`
    });
    setIsLoggedIn(true);
  };

  const handleGuestLogin = () => {
    setCurrentUser({ name: 'Guest User', role: 'GUEST' });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  // If logged in, show a simple placeholder
  if (isLoggedIn && currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            College Adda
          </h1>
          <p className="text-gray-300 mb-2">Welcome, {currentUser.name}!</p>
          <p className="text-gray-400 text-sm mb-4">Role: {currentUser.role}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 rounded-lg text-red-300 transition-all"
          >
            Logout
          </button>
          <p className="text-gray-500 text-xs mt-6">(Replace this with your actual dashboard page)</p>
        </div>
      </div>
    );
  }

  // Fixed particles array - no random values during render
  const particles = [
    { id: 1, top: '10%', left: '15%', duration: '8s', delay: '0s', size: '3px' },
    { id: 2, top: '20%', left: '75%', duration: '12s', delay: '1s', size: '2px' },
    { id: 3, top: '35%', left: '45%', duration: '10s', delay: '2s', size: '4px' },
    { id: 4, top: '50%', left: '85%', duration: '7s', delay: '0.5s', size: '2px' },
    { id: 5, top: '65%', left: '25%', duration: '14s', delay: '1.5s', size: '3px' },
    { id: 6, top: '75%', left: '60%', duration: '9s', delay: '3s', size: '2px' },
    { id: 7, top: '85%', left: '10%', duration: '11s', delay: '2.5s', size: '4px' },
    { id: 8, top: '15%', left: '50%', duration: '13s', delay: '0.8s', size: '2px' },
    { id: 9, top: '45%', left: '5%', duration: '6s', delay: '4s', size: '3px' },
    { id: 10, top: '70%', left: '90%', duration: '15s', delay: '1.2s', size: '2px' },
    { id: 11, top: '5%', left: '35%', duration: '9s', delay: '3.5s', size: '3px' },
    { id: 12, top: '55%', left: '70%', duration: '11s', delay: '0.3s', size: '2px' },
    { id: 13, top: '90%', left: '40%', duration: '7s', delay: '2.8s', size: '4px' },
    { id: 14, top: '30%', left: '95%', duration: '12s', delay: '1.8s', size: '2px' },
    { id: 15, top: '80%', left: '55%', duration: '10s', delay: '4.5s', size: '3px' },
  ];

  // Prevent hydration mismatch by only rendering animated elements after mount
  if (!mounted) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-6xl aspect-video">
            <div className="h-full flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-6">
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    College Adda
                  </h1>
                  <p className="text-gray-300 mt-2 text-sm">Next-Gen Resources Share Hub</p>
                </div>
                <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                  <div className="h-64 flex items-center justify-center">
                    <div className="animate-pulse text-purple-400">Loading...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        
        {/* Fixed particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: particle.size,
              height: particle.size,
              top: particle.top,
              left: particle.left,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          ></div>
        ))}
      </div>

      {/* Main Content - Fixed 16:9 Aspect Ratio Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl aspect-video">
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  College Adda
                </h1>
                <p className="text-gray-300 mt-2 text-sm">Next-Gen Resources Share Hub</p>
              </div>

              <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30 shadow-2xl">
                {/* Toggle Buttons */}
                <div className="flex gap-3 mb-5">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg transition-all text-sm font-medium ${
                      isLogin
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg transition-all text-sm font-medium ${
                      !isLogin
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs text-center">
                    {error}
                  </div>
                )}

                {isLogin ? (
                  <>
                    {/* Traditional Login Form */}
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder:text-gray-500"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder:text-gray-500"
                          placeholder="Password"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30"
                      >
                        Sign In
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-purple-500/30"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-black/40 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    {/* Social Login Options */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <button
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button
                        onClick={() => handleSocialLogin('GitHub')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                        </svg>
                        GitHub
                      </button>
                      <button
                        onClick={() => handleSocialLogin('Microsoft')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.4 11.4H2.2V2.2h9.2v9.2zM21.8 11.4h-9.2V2.2h9.2v9.2zM11.4 21.8H2.2v-9.2h9.2v9.2zM21.8 21.8h-9.2v-9.2h9.2v9.2z"/>
                        </svg>
                        Microsoft
                      </button>
                    </div>

                    {/* Guest Login */}
                    <div className="text-center mt-3">
                      <button
                        onClick={handleGuestLogin}
                        className="text-xs text-gray-400 hover:text-purple-400 transition-colors"
                      >
                        Continue as Guest →
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Compact Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-3">
                      <div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder:text-gray-500"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder:text-gray-500"
                          placeholder="Email address"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-2.5 bg-gray-900/50 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 transition placeholder:text-gray-500"
                          placeholder="Password"
                        />
                      </div>
                      
                      {/* Account Type - Compact */}
                      <div className="flex gap-4 py-1">
                        <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                          <input
                            type="radio"
                            value="VERIFIED"
                            checked={role === 'VERIFIED'}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-3.5 h-3.5 text-purple-600"
                          />
                          <span>Verified User</span>
                        </label>
                        <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                          <input
                            type="radio"
                            value="ADMIN"
                            checked={role === 'ADMIN'}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-3.5 h-3.5 text-red-600"
                          />
                          <span>ADMIN</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-medium text-sm hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/30 mt-1"
                      >
                        Create Account
                      </button>
                    </form>

                    {/* Social Signup Options */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-purple-500/30"></div>
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-2 bg-black/40 text-gray-400">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleSocialLogin('Google')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                      </button>
                      <button
                        onClick={() => handleSocialLogin('GitHub')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.73-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                        </svg>
                        GitHub
                      </button>
                      <button
                        onClick={() => handleSocialLogin('Microsoft')}
                        className="flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 border border-purple-500/30 rounded-lg transition text-white text-sm"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.4 11.4H2.2V2.2h9.2v9.2zM21.8 11.4h-9.2V2.2h9.2v9.2zM11.4 21.8H2.2v-9.2h9.2v9.2zM21.8 21.8h-9.2v-9.2h9.2v9.2z"/>
                        </svg>
                        Microsoft
                      </button>
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-gray-500 text-xs mt-4">
                Demo: admin@collegeadda.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}