import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Quote, Send } from "lucide-react";
import { useSubmitSuccessStory } from "@/hooks/useSuccessStories";

export default function ShareStory() {
  const { toast } = useToast();
  const submitMutation = useSubmitSuccessStory();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    previousRole: "",
    mentorName: "",
    quote: "",
    highlight: "",
    duration: "",
    linkedinUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast({
        title: "Please agree to the terms",
        description: "You must agree to share your story publicly.",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitMutation.mutateAsync(formData);
      setIsSubmitted(true);
      toast({
        title: "Story Submitted!",
        description: "Thank you for sharing your success story. We'll review it shortly.",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                Thank You for Sharing!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your success story has been submitted successfully. Our team will review it and 
                reach out if we need any additional information. Once approved, your story will 
                be featured on our Success Stories page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/success-stories">
                    View Success Stories
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Quote className="h-4 w-4" />
              Share Your Journey
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-foreground mb-6">
              Share Your <span className="text-primary italic">Success Story</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Your journey could inspire thousands of others. Tell us how mentorship 
              transformed your career and help others see what's possible.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Info */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                  <h2 className="text-xl font-display text-foreground mb-6">About You</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Current Role *</Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="e.g., Product Manager at Google"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="previousRole">Previous Role *</Label>
                      <Input
                        id="previousRole"
                        name="previousRole"
                        placeholder="e.g., Junior Developer"
                        value={formData.previousRole}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
                      <Input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Mentorship Details */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                  <h2 className="text-xl font-display text-foreground mb-6">Mentorship Details</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mentorName">Mentor's Name *</Label>
                      <Input
                        id="mentorName"
                        name="mentorName"
                        placeholder="Your mentor's name"
                        value={formData.mentorName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Mentorship Duration *</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="e.g., 6 months"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <Label htmlFor="highlight">Key Achievement *</Label>
                      <Input
                        id="highlight"
                        name="highlight"
                        placeholder="e.g., Salary increased by 50%, Got promoted to Senior"
                        value={formData.highlight}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Your Story */}
                <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                  <h2 className="text-xl font-display text-foreground mb-6">Your Story</h2>
                  <div className="space-y-2">
                    <Label htmlFor="quote">Share Your Experience *</Label>
                    <Textarea
                      id="quote"
                      name="quote"
                      placeholder="Tell us about your mentorship journey. What challenges did you face? How did your mentor help you? What results did you achieve?"
                      value={formData.quote}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="resize-none"
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum 100 characters. Be specific about the impact mentorship had on your career.
                    </p>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                    I agree to have my story published on SwarChAI. I confirm that the information 
                    provided is accurate and I have permission to mention my mentor.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Your Story
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                <Star className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-lg text-foreground mb-2">Why Share?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Inspire others on their career journey
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Celebrate your achievements publicly
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Give back to the community
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Thank your mentor publicly
                  </li>
                </ul>
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="font-display text-lg text-foreground mb-4">Tips for a Great Story</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>• Be specific about the challenges you faced</li>
                  <li>• Describe how your mentor helped you</li>
                  <li>• Include measurable outcomes when possible</li>
                  <li>• Keep it authentic and personal</li>
                  <li>• Mention the duration of your mentorship</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
