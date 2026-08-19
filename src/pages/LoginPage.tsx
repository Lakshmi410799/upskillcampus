import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Car, 
  ShieldCheck, 
  Truck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Wrench, 
  KeyRound,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { user, login, signup, loginAdmin, setView, showToast } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'otp' | 'forgot'>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // If user is already logged in, show summary and shortcut to Account / Garage
  if (user) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 space-y-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">YOU ARE SIGNED IN</h2>
            <p className="text-xs text-slate-500">
              Signed in as <strong className="text-slate-800">{user.name}</strong> ({user.email})
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              id="logged-in-garage-btn"
              onClick={() => setView('account')}
              className="py-3 px-4 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xs"
            >
              <Car className="w-4 h-4 text-[#fbbf24]" />
              <span>Go to My Garage & Account</span>
            </button>
            <button
              id="logged-in-catalog-btn"
              onClick={() => setView('catalog')}
              className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Wrench className="w-4 h-4" />
              <span>Explore Parts Catalog</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setFormError('Please enter your password (minimum 4 characters).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(email.trim());
      setView('account');
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setFormError('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      signup(name.trim(), email.trim());
      setView('account');
    }, 600);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMode('otp');
      showToast(`Verification code sent to +91 ${cleanPhone.slice(-10)} (Demo code: 1234)`);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = otpCode.join('');
    if (entered.length !== 4) {
      setFormError('Please enter the full 4-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(`${phoneNumber.replace(/\D/g, '').slice(-4)}@mobile.user`, 'Mobile Driver');
      setView('account');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...otpCode];
    newCode[index] = val;
    setOtpCode(newCode);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleDemoLogin = (type: 'customer' | 'mechanic' | 'admin') => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (type === 'customer') {
        login('aarav.sharma@example.com', 'Aarav Sharma');
        setView('account');
      } else if (type === 'mechanic') {
        login('rohan.verma@speedshop.in', 'Rohan Verma (Master Tech)');
        setView('account');
      } else if (type === 'admin') {
        login('admin@partworks.in', 'Store Admin');
        loginAdmin();
        setView('admin');
      }
    }, 400);
  };

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-8">
      
      {/* Top Banner Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => setView('home')} className="hover:text-slate-900 cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-slate-900 font-bold">Account Authentication</span>
        </div>
        <button
          onClick={() => setView('catalog')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
        >
          <span>Continue as Guest</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Header Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
            <button
              id="auth-tab-signin"
              onClick={() => {
                setMode('signin');
                setFormError(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signin' || mode === 'otp' || mode === 'forgot'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              id="auth-tab-signup"
              onClick={() => {
                setMode('signup');
                setFormError(null);
              }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Error Banner */}
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* MODE 1: SIGN IN */}
          {mode === 'signin' && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">WELCOME BACK TO PARTWORKS</h1>
                <p className="text-xs text-slate-500">Sign in to access your saved garage, fitment history, and tracked orders.</p>
              </div>

              {/* Toggle Email vs Phone */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('email')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    authMethod === 'email'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email & Password</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('phone')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    authMethod === 'phone'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
              </div>

              {authMethod === 'email' ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                    <div className="relative">
                      <input
                        id="login-email-input"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 block">Password</label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[11px] font-bold text-amber-600 hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        id="login-password-input"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                      />
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>

                  <button
                    id="login-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#fbbf24]" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Account</span>
                        <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Mobile Phone Number</label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-xs font-bold text-slate-500">+91</span>
                      <input
                        id="login-phone-input"
                        type="tel"
                        required
                        placeholder="98765 43210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all font-mono"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">We will send a 4-digit SMS verification code to your device</p>
                  </div>

                  <button
                    id="login-send-otp-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#fbbf24]" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification Code</span>
                        <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODE 2: OTP VERIFICATION */}
          {mode === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">ENTER 4-DIGIT VERIFICATION CODE</h1>
                <p className="text-xs text-slate-500">
                  Sent to <strong className="text-slate-800">+91 {phoneNumber}</strong> • (Demo code: <strong className="font-mono text-amber-600">1234</strong>)
                </p>
              </div>

              <div className="flex justify-center gap-3 py-2">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-digit-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otpCode[idx]}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-mono font-black bg-slate-50 border-2 border-slate-200 focus:border-amber-400 focus:bg-white rounded-2xl focus:outline-hidden transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  ← Change phone number
                </button>
                <button
                  type="button"
                  onClick={() => showToast('New code sent: 1234')}
                  className="font-bold text-amber-600 hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>

              <button
                id="verify-otp-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#fbbf24]" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 3: CREATE ACCOUNT (SIGN UP) */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">CREATE YOUR PARTWORKS ACCOUNT</h1>
                <p className="text-xs text-slate-500">Save your vehicles, unlock express checkout, and get 10% off your first order.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Full Name</label>
                <div className="relative">
                  <input
                    id="signup-name-input"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Email Address</label>
                <div className="relative">
                  <input
                    id="signup-email-input"
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Create Password</label>
                <div className="relative">
                  <input
                    id="signup-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed pt-1">
                By creating an account, you agree to PartWorks' Terms of Service and Privacy Policy. All part fitments are backed by our 100% money-back guarantee.
              </div>

              <button
                id="signup-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#fbbf24]" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4 text-[#fbbf24]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* MODE 4: FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">RESET YOUR PASSWORD</h1>
                <p className="text-xs text-slate-500">Enter your registered email and we'll send password recovery instructions.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Registered Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast(`Password reset link sent to ${email || 'your email'}`);
                  setMode('signin');
                }}
                className="w-full py-3.5 bg-[#0f172a] hover:bg-slate-800 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Send Password Reset Link</span>
                <KeyRound className="w-4 h-4 text-[#fbbf24]" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-xs text-slate-600 hover:text-slate-900 font-bold cursor-pointer"
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          )}

          {/* One-Click Demo Personas */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-bold tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#fbbf24]" />
              <span>One-Click Instant Demo Profiles</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                id="demo-login-customer"
                type="button"
                onClick={() => handleDemoLogin('customer')}
                className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 hover:bg-amber-100/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-1.5 py-0.5 rounded-md">
                    Customer
                  </span>
                  <Car className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs font-bold text-slate-900">Aarav Sharma</p>
                <p className="text-[10px] text-slate-500">2 Vehicles in Garage</p>
              </button>

              <button
                id="demo-login-mechanic"
                type="button"
                onClick={() => handleDemoLogin('mechanic')}
                className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-100/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-200/60 px-1.5 py-0.5 rounded-md">
                    Pro Tech
                  </span>
                  <Wrench className="w-3.5 h-3.5 text-blue-700 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs font-bold text-slate-900">Rohan Verma</p>
                <p className="text-[10px] text-slate-500">Master Tech / Shop</p>
              </button>

              <button
                id="demo-login-admin"
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200/80 hover:bg-purple-100/70 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-200/60 px-1.5 py-0.5 rounded-md">
                    Admin
                  </span>
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-700 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-xs font-bold text-slate-900">Store Admin</p>
                <p className="text-[10px] text-slate-500">Catalog & Orders</p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Info & Value Proposition Bento Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Garage Sync Value Card */}
          <div className="p-6 rounded-3xl bg-[#0f172a] text-white shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#fbbf24] text-slate-950 flex items-center justify-center font-black">
              <Car className="w-5 h-5" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-black text-white tracking-tight">WHY CREATE A PARTWORKS ACCOUNT?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Save your specific car make, model, and engine trim. Whenever you browse, we filter out incompatible parts with 100% verified fitment.
              </p>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span><strong>Multi-Car Garage:</strong> Save daily drivers, track cars, and project builds in one place.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span><strong>Fast Track Checkout:</strong> Saved GST addresses, UPI handles, and 1-click ordering.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span><strong>Live Shipment Tracking:</strong> Receive real-time tracking numbers & 2-day delivery updates.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <span><strong>100% Fitment Guarantee:</strong> Zero restocking fees on guaranteed fitment returns.</span>
              </div>
            </div>
          </div>

          {/* Quick Help & Assistance Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Need Technical Help?</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our master certified ASE technicians are on standby to cross-reference OEM part numbers and chassis codes.
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono font-bold text-slate-900">
              <span>Toll Free Support:</span>
              <span className="text-[#0f172a]">1-800-PART-WORKS</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
