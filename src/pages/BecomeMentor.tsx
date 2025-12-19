import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Heart, Users, Sparkles, CheckCircle, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";

const industries = [
  "Software Engineering",
  "Product Management",
  "UX/UI Design",
  "Data Science",
  "Marketing",
  "Finance",
  "Entrepreneurship",
  "Human Resources",
  "Sales",
  "Other",
];

const experienceLevels = [
  "3-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years",
];

const benefits = [
  {
    icon: Heart,
    title: "Give Back",
    description: "Share your knowledge and help shape the next generation of professionals.",
  },
  {
    icon: Users,
    title: "Expand Your Network",
    description: "Connect with ambitious individuals and fellow mentors in our community.",
  },
  {
    icon: Sparkles,
    title: "Grow Together",
    description: "Teaching others reinforces your own knowledge and develops leadership skills.",
  },
];

export default function BecomeMentor() {
  const { toast } = useToast();
  const { register, socialLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    linkedIn: "",
    currentRole: "",
    company: "",
    industry: "",
    experience: "",
    expertise: "",
    motivation: "",
    availability: "",
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to volunteer your time before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(formData.email, formData.password, formData.fullName, {
        userRole: 'mentor',
        profileData: {
          linkedIn: formData.linkedIn,
          currentRole: formData.currentRole,
          company: formData.company,
          industry: formData.industry,
          experience: formData.experience,
          expertise: formData.expertise,
          motivation: formData.motivation,
          availability: formData.availability,
        }
      });

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Account Created & Interview Requested!",
          description: "We'll reach out within 2-3 business days to schedule your interview.",
        });
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

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                Interview Scheduled!
              </h1>
              <p className="text-muted-foreground mb-4">
                Thank you for applying to become a mentor at SwarChAI. 
              </p>
              <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
                <h3 className="font-display text-lg text-foreground mb-3">Next Steps:</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>Our team will review your application within 2-3 business days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>You'll receive an email to schedule a 30-minute interview call</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>After the interview, we'll onboard you to the mentor community</span>
                  </li>
                </ul>
              </div>
              <Button variant="hero" asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6 animate-fade-up">
              Become a <span className="text-primary italic">Mentor</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Join our community of volunteer mentors and help others grow. Share your expertise, make an impact, and be part of something meaningful—all for free.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-teal text-primary-foreground mb-4">
                  <benefit.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-display text-foreground mb-3">
                Mentor Application
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within a few days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Social Sign Up Option */}
              <div className="bg-secondary/30 rounded-xl p-6 space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Quick sign up with your social account
                </p>
                <SocialAuthButtons
                  mode="signup"
                  onSocialLogin={async (provider, userData) => {
                    const result = await socialLogin(provider, userData, 'mentor');
                    if (result.success) {
                      setFormData((prev) => ({
                        ...prev,
                        email: userData.email,
                        fullName: userData.name,
                      }));
                      toast({
                        title: "Account connected!",
                        description: "Please complete the form below to finish your application.",
                      });
                    }
                  }}
                />
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or fill in manually</span>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-foreground border-b border-border pb-2">
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
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
                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile URL *</Label>
                  <Input
                    id="linkedIn"
                    placeholder="https://linkedin.com/in/johndoe"
                    value={formData.linkedIn}
                    onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/auth" className="text-primary font-semibold hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>

              {/* Professional Info */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-foreground border-b border-border pb-2">
                  Professional Background
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      placeholder="Senior Software Engineer"
                      value={formData.currentRole}
                      onChange={(e) => handleInputChange("currentRole", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Google"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Industry *</Label>
                    <Select
                      value={formData.industry}
                      onValueChange={(value) => handleInputChange("industry", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Years of Experience *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Mentorship Info */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-foreground border-b border-border pb-2">
                  Mentorship Details
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="expertise">Areas of Expertise *</Label>
                  <Textarea
                    id="expertise"
                    placeholder="e.g., System design, career transitions, interview prep, frontend development..."
                    value={formData.expertise}
                    onChange={(e) => handleInputChange("expertise", e.target.value)}
                    required
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="motivation">Why do you want to become a mentor? *</Label>
                  <Textarea
                    id="motivation"
                    placeholder="Tell us about your motivation to help others..."
                    value={formData.motivation}
                    onChange={(e) => handleInputChange("motivation", e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability (hours per month) *</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., 4-6 hours"
                    value={formData.availability}
                    onChange={(e) => handleInputChange("availability", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Interview Info */}
              <div className="space-y-4">
                <h3 className="font-display text-lg text-foreground border-b border-border pb-2">
                  Interview Scheduling
                </h3>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Interview Process:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• A 30-minute video call with our team</li>
                    <li>• Discussion about your mentoring approach and experience</li>
                    <li>• Q&A about program expectations and commitments</li>
                    <li>• Onboarding to our mentor community</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewAvailability">Preferred Interview Time Slots *</Label>
                  <Textarea
                    id="interviewAvailability"
                    placeholder="Please share your availability for a 30-minute interview call (e.g., weekday evenings, weekend mornings)..."
                    rows={2}
                    required
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I understand that mentorship at SwarChAI is completely voluntary and free. I agree to dedicate my time to help mentees grow and follow the community guidelines.
                </label>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
