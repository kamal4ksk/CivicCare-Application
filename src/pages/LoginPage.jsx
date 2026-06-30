import { useNavigate } from 'react-router-dom';
import { UserCircle, Mail, ArrowLeft } from 'lucide-react';

/**
 * LoginPage — "Welcome to CivicCare"
 * Two options: Continue Anonymously or Sign in with Google
 */
export default function LoginPage() {
  const navigate = useNavigate();

  const handleAnonymous = () => {
    // Store anonymous session flag
    sessionStorage.setItem('civiccare_user', JSON.stringify({ type: 'anonymous', name: `Anonymous User ${Math.floor(1000 + Math.random() * 9000)}` }));
    navigate('/home');
  };

  const handleGoogle = () => {
    // In production: trigger Google OAuth. For demo, go directly to home.
    sessionStorage.setItem('civiccare_user', JSON.stringify({ type: 'google', name: 'Demo User', email: 'demo@gmail.com' }));
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl shadow-purple-200 mb-5">
            <span className="text-2xl font-extrabold text-white">CC</span>
          </div>
          <h1 className="text-2xl font-extrabold text-violet-600 mb-1">Welcome to CivicCare</h1>
          <p className="text-sm text-gray-500">Choose how you'd like to continue</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          {/* Anonymous */}
          <button
            onClick={handleAnonymous}
            className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200
              hover:border-violet-300 hover:shadow-lg hover:shadow-purple-50 transition-all text-left"
          >
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Continue Anonymously</p>
              <p className="text-sm text-gray-500">Post concerns without revealing your identity</p>
            </div>
          </button>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200
              hover:border-violet-300 hover:shadow-lg hover:shadow-purple-50 transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Sign in with Google</p>
              <p className="text-sm text-gray-500">Use your Google account for full features</p>
            </div>
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By continuing, you agree to our{' '}
          <a href="#" className="text-violet-500 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-violet-500 hover:underline">Privacy Policy</a>
        </p>

        {/* Back */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mx-auto transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
