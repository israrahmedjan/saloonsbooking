"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import { 
  LogOut, 
  Mail, 
  Lock, 
  User as UserIcon,
  AlertCircle,
  Loader2,
  Shield,
  Sparkles,
  Rocket,
  Users,
  Key,
  CheckCircle
} from "lucide-react";
import { handleSignIn, handleSignInWithProvider, handleSignUp, logout, signInWithGoogle } from "@/app/lib/auth2";
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa6";

function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  // Update user state
  const updateUser = (session: Session | null) => {
    setUser(session?.user ?? null);
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        updateUser(session);
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event);
      updateUser(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      let result;
      if (activeTab === 'signin') {
        result = await handleSignIn(email, password);
        if (result.error) {
          setError(result.error.message);
        } else {
          setSuccess('Signed in successfully!');
          setEmail('');
          setPassword('');
        }
      } else {
        if (!username.trim()) {
          setError('Username is required');
          setIsSubmitting(false);
          return;
        }
        result = await handleSignUp(email, password, { username });
        if (result.error) {
          setError(result.error.message);
        } else {
          setSuccess('Account created successfully! Please check your email.');
          setEmail('');
          setPassword('');
          setUsername('');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github' | 'twitter' | 'facebook') => {
    setError(null);
    setSocialLoading(provider);
    
    try {
      let result;
      switch (provider) {
        case 'google':
          result = await signInWithGoogle();
          break;
        case 'github':
        case 'twitter':
        case 'facebook':
          result = await handleSignInWithProvider(provider);
          break;
        default:
          return;
      }
      
      if (result?.error) {
        setError(result.error.message);
      } else {
        setSuccess(`Signing in with ${provider}...`);
      }
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
      console.error(err);
    } finally {
      setSocialLoading(null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-br from-primary/50 via-purple-50 to-pink-50">
        <div className="flex flex-col items-center gap-3 bg-white p-8 rounded-2xl shadow-xl">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primery" />
          </div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show logout button
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center   p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-all hover:scale-[1.02]">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.user_metadata?.username || user.email?.split('@')[0] || 'User'}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-sm text-gray-700">Logged in successfully</span>
            </div>
            <Shield className="w-5 h-5 text-primery" />
          </div>
          
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary hover:to-primary/50 transition-all hover:scale-[1.02] shadow-lg shadow-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full transform transition-all hover:shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
              {activeTab === 'signin' ? (
                <Key className="w-8 h-8 text-white" />
              ) : (
                <Rocket className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            {activeTab === 'signin' ? (
              <Sparkles className="w-5 h-5 text-indigo-500" />
            ) : (
              <Rocket className="w-5 h-5 text-purple-500" />
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {activeTab === 'signin' 
              ? 'Sign in to your account to continue' 
              : 'Join us and start your journey today'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1 mb-8">
          <button
            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'signin'
                ? 'bg-white text-primery shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => {
              setActiveTab('signin');
              setError(null);
              setSuccess(null);
            }}
            disabled={isSubmitting}
          >
            <Key className="w-4 h-4" />
            Sign In
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === 'signup'
                ? 'bg-white text-primery shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => {
              setActiveTab('signup');
              setError(null);
              setSuccess(null);
            }}
            disabled={isSubmitting}
          >
            <Users className="w-4 h-4" />
            Sign Up
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
            <div className="bg-red-100 rounded-full p-1.5 flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-700">Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-fadeIn">
            <div className="bg-green-100 rounded-full p-1.5 flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Success</p>
              <p className="text-sm text-green-600">{success}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'signup' && (
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-100 rounded-full p-1.5 group-hover:bg-indigo-200 transition-all">
                <UserIcon className="w-5 h-5 text-primery" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-14 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-300"
                required={activeTab === 'signup'}
                disabled={isSubmitting}
              />
            </div>
          )}
          
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-100 rounded-full p-1.5 group-hover:bg-indigo-200 transition-all">
              <Mail className="w-5 h-5 text-primery" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-14 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-300"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo-100 rounded-full p-1.5 group-hover:bg-indigo-200 transition-all">
              <Lock className="w-5 h-5 text-primery" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-14 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-300"
              required
              minLength={6}
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-primary to-primary/50 text-white rounded-xl hover:from-primary hover:to-secondary transition-all hover:scale-[1.02] font-medium shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {activeTab === 'signin' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              <>
                {activeTab === 'signin' ? (
                  <>
                    <Key className="w-5 h-5" />
                    Sign In
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-sm text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleSocialSignIn('google')}
            className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.02] hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!socialLoading}
          >
            {socialLoading === 'google' ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            ) : (
              <FaGoogle className="w-6 h-6 text-blue-500" />
            )}
            <span className="text-sm font-semibold text-gray-700">Google</span>
          </button>
          
          <button
            onClick={() => handleSocialSignIn('github')}
            className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.02] hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!socialLoading}
          >
            {socialLoading === 'github' ? (
              <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
            ) : (
              <FaGithub className="w-6 h-6 text-gray-700" />
            )}
            <span className="text-sm font-semibold text-gray-700">GitHub</span>
          </button>
          
          <button
            onClick={() => handleSocialSignIn('twitter')}
            className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.02] hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!socialLoading}
          >
            {socialLoading === 'twitter' ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            ) : (
              <FaTwitter className="w-6 h-6 text-blue-400" />
            )}
            <span className="text-sm font-semibold text-gray-700">Twitter</span>
          </button>
          
          <button
            onClick={() => handleSocialSignIn('facebook')}
            className="flex items-center justify-center gap-3 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.02] hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!socialLoading}
          >
            {socialLoading === 'facebook' ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            ) : (
              <FaFacebook className="w-6 h-6 text-blue-600" />
            )}
            <span className="text-sm font-semibold text-gray-700">Facebook</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t-2 border-gray-100">
          <p className="text-xs text-gray-500">
            {activeTab === 'signin' 
              ? "Don't have an account? " 
              : "Already have an account? "}
            <button
              onClick={() => {
                setActiveTab(activeTab === 'signin' ? 'signup' : 'signin');
                setError(null);
                setSuccess(null);
              }}
              className="text-primery font-semibold hover:text-primary transition-colors hover:underline"
            >
              {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secured with Supabase
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;