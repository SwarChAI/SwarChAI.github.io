import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";

const industries = [
  "Technology", "Finance", "Healthcare", "Education", "Marketing",
  "Design", "Consulting", "Non-Profit", "Entrepreneurship", "Other"
];

const goals = [
  "Career transition",
  "Skill development",
  "Networking",
  "Interview preparation",
  "Leadership growth",
  "Getting started in industry",
];

export default function Signup() {
  const [step, setStep] = useState(0); // Start at 0 for auth method selection
  const [authMethod, setAuthMethod] = useState<'email' | 'social' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    linkedIn: "",
    currentRole: "",
    targetRole: "",
    industry: "",
    experience: "",
    goals: [] as string[],
    bio: "",
  });
  const { toast } = useToast();
  const { register, socialLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const toggleGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await register(
        formData.email,
        formData.password,
        `${formData.firstName} ${formData.lastName}`,
        {
          userRole: 'mentee',
          profileData: {
            linkedIn: formData.linkedIn,
            currentRole: formData.currentRole,
            targetRole: formData.targetRole,
            industry: formData.industry,
            experience: formData.experience,
            goals: formData.goals,
            bio: formData.bio,
          }
        }
      );

      if (result.success) {
        toast({
          title: "Account Created & Consultation Scheduled!",
          description: "We'll reach out within 24-48 hours to schedule your initial call.",
        });
        setStep(5);
      } else {
        toast({
          title: "Registration Failed",
          description: result.error || "Could not create account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-16 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Progress - only show after auth method selection */}
            {step >= 1 && step < 5 && (
              <div className="flex items-center justify-center gap-2 mb-12">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        s <= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {s < step ? <Check className="h-5 w-5" /> : s}
                    </div>
                    {s < 4 && (
                      <div className={`w-12 h-1 mx-1 rounded ${s < step ? "bg-primary" : "bg-secondary"}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Step 0: Choose Sign Up Method */}
            {step === 0 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                    Join <span className="text-primary italic">SwarChAI</span>
                  </h1>
                  <p className="text-muted-foreground">
                    Choose how you'd like to create your account
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-card space-y-6">
                  {/* Social Sign Up */}
                  <div>
                    <SocialAuthButtons
                      mode="signup"
                      onSocialLogin={async (provider, userData) => {
                        const result = await socialLogin(provider, userData, 'mentee');
                        if (result.success) {
                          setFormData((prev) => ({
                            ...prev,
                            email: userData.email,
                            firstName: userData.name.split(' ')[0] || '',
                            lastName: userData.name.split(' ').slice(1).join(' ') || '',
                          }));
                          setAuthMethod('social');
                          setStep(2); // Skip to profile info (step 2), since email is already verified
                        }
                      }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
                    </div>
                  </div>

                  {/* Email Sign Up Button */}
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => {
                      setAuthMethod('email');
                      setStep(1);
                    }}
                  >
                    Continue with Email
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/auth" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                    Let's Get Started
                  </h1>
                  <p className="text-muted-foreground">
                    First, tell us a bit about yourself
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name
                        </label>
                        <Input
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name
                        </label>
                        <Input
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Create a password"
                          className="pr-12"
                          required
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
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        LinkedIn Profile *
                      </label>
                      <Input
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        placeholder="https://linkedin.com/in/johndoe"
                        required
                      />
                    </div>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={() => setStep(2)}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.linkedIn}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/auth" className="text-primary font-semibold hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Career Info */}
            {step === 2 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                    Your Career Journey
                  </h1>
                  <p className="text-muted-foreground">
                    Help us understand where you are and where you want to go
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Current Role
                      </label>
                      <Input
                        value={formData.currentRole}
                        onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                        placeholder="e.g., Junior Developer, Student, Career Changer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Target Role
                      </label>
                      <Input
                        value={formData.targetRole}
                        onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                        placeholder="e.g., Senior Product Manager"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Industry Interest
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {industries.map((industry) => (
                          <button
                            key={industry}
                            type="button"
                            onClick={() => setFormData({ ...formData, industry })}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                              formData.industry === industry
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {industry}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Years of Experience
                      </label>
                      <div className="flex gap-2">
                        {["0-1", "1-3", "3-5", "5-10", "10+"].map((exp) => (
                          <button
                            key={exp}
                            type="button"
                            onClick={() => setFormData({ ...formData, experience: exp })}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                              formData.experience === exp
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep(3)}
                        disabled={!formData.industry}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals & Bio */}
            {step === 3 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                    Your Goals
                  </h1>
                  <p className="text-muted-foreground">
                    What do you hope to achieve with mentorship?
                  </p>
                </div>
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Select Your Goals (Choose up to 3)
                      </label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {goals.map((goal) => (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => toggleGoal(goal)}
                            disabled={formData.goals.length >= 3 && !formData.goals.includes(goal)}
                            className={`px-4 py-3 rounded-lg text-sm text-left transition-all flex items-center justify-between ${
                              formData.goals.includes(goal)
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            } ${formData.goals.length >= 3 && !formData.goals.includes(goal) ? "opacity-50" : ""}`}
                          >
                            {goal}
                            {formData.goals.includes(goal) && <Check className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Tell Us About Yourself
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Share your story, challenges, and what you're looking for in a mentor..."
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>
                        Back
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep(4)}
                        disabled={formData.goals.length === 0}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Initial Consultation */}
            {step === 4 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                    Initial Consultation
                  </h1>
                  <p className="text-muted-foreground">
                    Schedule a brief call to help us understand your needs better
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card">
                  <div className="space-y-5">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h3 className="font-medium text-foreground mb-2">What to expect:</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• A 15-minute introductory call with our team</li>
                        <li>• Discussion about your career goals and expectations</li>
                        <li>• Guidance on how the mentorship program works</li>
                        <li>• Matching you with the right mentor</li>
                      </ul>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Preferred Time Slots *
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Please share your availability for a 15-minute call (e.g., weekday mornings, weekend afternoons)..."
                        rows={3}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Any specific questions or topics you'd like to discuss?
                      </label>
                      <Textarea
                        placeholder="Optional: Share any questions you have about the program..."
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" size="lg" onClick={() => setStep(3)}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Creating Account..." : "Submit & Schedule Consultation"}
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
              <div className="animate-fade-up text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10" />
                </div>
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                  Consultation Scheduled!
                </h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  We've received your application. Our team will reach out within 24-48 hours to schedule your initial consultation call. Keep an eye on your email!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/application-status">View Application Status</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
