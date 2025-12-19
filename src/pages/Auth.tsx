import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Layout } from '@/components/layout/Layout';
import { Eye, EyeOff, Loader2, Users, GraduationCap, Clock, CheckCircle2, Calendar, Shield } from 'lucide-react';
import { SocialAuthButtons } from '@/components/SocialAuthButtons';
import { demoAccounts, DemoAccount } from '@/data/demoAccounts';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  
  const { login, socialLogin, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    // Check if profile is incomplete (social login users)
    if (!user.profileComplete && user.provider && user.provider !== 'email') {
      navigate('/complete-profile');
      return null;
    }
    if (user.userRole === 'admin') {
      navigate('/admin');
    } else if (user.approvalStatus === 'approved') {
      navigate(user.userRole === 'mentor' ? '/mentor/dashboard' : '/mentee/dashboard');
    } else {
      navigate('/application-status');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
        // Navigation handled by the redirect logic above
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (account: DemoAccount) => {
    setIsSubmitting(true);
    try {
      const result = await login(account.email, account.password);
      if (result.success) {
        toast({
          title: `Welcome, ${account.user.name}!`,
          description: `Logged in as ${account.user.userRole} (${account.user.approvalStatus})`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'consultation_scheduled':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-amber-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'consultation_scheduled':
        return 'Consultation Scheduled';
      default:
        return 'Pending';
    }
  };

  const adminAccounts = demoAccounts.filter(a => a.category === 'admin');
  const menteeAccounts = demoAccounts.filter(a => a.category === 'mentee');
  const mentorAccounts = demoAccounts.filter(a => a.category === 'mentor');

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to access your mentorship journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <SocialAuthButtons
              mode="signin"
              isLoading={isSubmitting}
              onSocialLogin={async (provider, userData) => {
                const result = await socialLogin(provider, userData);
                if (result.success) {
                  toast({
                    title: 'Welcome!',
                    description: `Signed in with ${provider === 'google' ? 'Google' : 'LinkedIn'}. Please complete your profile.`,
                  });
                  // Navigate to profile completion
                  navigate('/complete-profile');
                }
              }}
            />

            {/* Demo Accounts Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <button
                type="button"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full text-center text-sm text-primary hover:underline font-medium"
              >
                {showDemoAccounts ? 'Hide Demo Accounts' : '🧪 Try Demo Accounts'}
              </button>

              {showDemoAccounts && (
                <div className="mt-4 space-y-4 animate-fade-in">
                  {/* Admin Demo Account */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Admin Account</span>
                    </div>
                    <div className="space-y-2">
                      {adminAccounts.map((account) => (
                        <button
                          key={account.email}
                          onClick={() => handleDemoLogin(account)}
                          disabled={isSubmitting}
                          className="w-full p-3 text-left rounded-lg border border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {account.user.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {account.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-primary">
                              <Shield className="h-3 w-3" />
                              <span>Admin</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mentee Demo Accounts */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>Mentee Accounts</span>
                    </div>
                    <div className="space-y-2">
                      {menteeAccounts.map((account) => (
                        <button
                          key={account.email}
                          onClick={() => handleDemoLogin(account)}
                          disabled={isSubmitting}
                          className="w-full p-3 text-left rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {account.user.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {account.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {getStatusIcon(account.user.approvalStatus)}
                              <span className="text-muted-foreground">{getStatusLabel(account.user.approvalStatus)}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mentor Demo Accounts */}
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Mentor Accounts</span>
                    </div>
                    <div className="space-y-2">
                      {mentorAccounts.map((account) => (
                        <button
                          key={account.email}
                          onClick={() => handleDemoLogin(account)}
                          disabled={isSubmitting}
                          className="w-full p-3 text-left rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all group"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                {account.user.name}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {account.description}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              {getStatusIcon(account.user.approvalStatus)}
                              <span className="text-muted-foreground">{getStatusLabel(account.user.approvalStatus)}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    Click any account to instantly log in and test the workflow
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 text-center space-y-3">
              <p className="text-muted-foreground">
                Don't have an account?
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/signup">Sign up as Mentee</Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/become-mentor">Become a Mentor</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
