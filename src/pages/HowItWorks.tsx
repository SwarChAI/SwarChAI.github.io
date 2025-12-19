import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  Rocket, 
  Sparkles, 
  Brain, 
  Target, 
  LineChart,
  CheckCircle2,
  ArrowRight,
  Zap,
  BookOpen,
  Users,
  Bot,
  Lightbulb,
  TrendingUp
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and tell us about your career goals, interests, and what you're looking to achieve. Our AI analyzes your profile to understand your unique needs.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm analyzes 50+ data points to connect you with mentors who align with your goals, industry, and learning style—completely free.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: MessageSquare,
    title: "Connect & Collaborate",
    description: "Browse mentor profiles, read reviews, and request sessions. Get AI-suggested talking points and preparation tips before each meeting.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Rocket,
    title: "Grow Together",
    description: "Have meaningful conversations, set goals, and track your progress with AI-powered insights. Build lasting relationships that accelerate your career.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const aiFeatures = [
  {
    icon: Brain,
    title: "Smart Mentor Matching",
    description: "Our AI analyzes 50+ data points including your goals, personality, learning style, and career aspirations to find mentors who truly understand your journey.",
  },
  {
    icon: Target,
    title: "Goal Tracking & Insights",
    description: "AI-powered goal setting helps you break down big career objectives into actionable steps, with personalized recommendations based on your progress.",
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    description: "Get detailed insights on your mentorship journey with AI-generated reports that highlight your growth areas and celebrate your wins.",
  },
  {
    icon: Sparkles,
    title: "Session Preparation",
    description: "Before each session, our AI suggests topics to discuss, questions to ask, and areas to focus on based on your goals and previous conversations.",
  },
  {
    icon: Bot,
    title: "AI Career Assistant",
    description: "24/7 access to an AI assistant that can answer career questions, provide guidance, and help you prepare for interviews when your mentor is unavailable.",
  },
  {
    icon: Lightbulb,
    title: "Personalized Learning Paths",
    description: "Get custom learning recommendations based on your goals. Our AI curates resources, courses, and articles tailored to your growth journey.",
  },
];

const additionalAIServices = [
  {
    icon: BookOpen,
    title: "AI-Curated Resources",
    description: "Personalized article, course, and book recommendations based on your learning goals and progress.",
  },
  {
    icon: TrendingUp,
    title: "Career Trajectory Analysis",
    description: "AI predicts potential career paths and suggests skills to develop for your dream role.",
  },
  {
    icon: Users,
    title: "Community Matching",
    description: "Connect with peers on similar journeys for group learning and accountability support.",
  },
  {
    icon: Zap,
    title: "Skill Gap Analysis",
    description: "AI identifies skill gaps between your current abilities and target role requirements.",
  },
];

const benefits = [
  "100% free for everyone",
  "Vetted industry professionals",
  "AI-powered personalization",
  "Community-driven platform",
  "Progress tracking & analytics",
  "24/7 AI assistant support",
];

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              AI-Powered & Community-Driven
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
              How <span className="text-primary italic">SwarChAI</span> Works
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From sign-up to career transformation, we combine AI technology with human mentorship 
              to accelerate your growth—100% free for our community.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block" />
              
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-6 mb-12 last:mb-0">
                  <div className={`${step.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 z-10`}>
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  <div className="pt-2">
                    <span className="text-sm text-muted-foreground font-medium">Step {index + 1}</span>
                    <h3 className="text-2xl font-display text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Brain className="h-4 w-4" />
              Powered by Advanced AI
            </span>
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              How We Leverage <span className="text-primary italic">AI</span> to Help Your Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our intelligent platform uses cutting-edge AI to enhance every step of your growth experience, 
              from finding the perfect mentor to tracking your career progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {aiFeatures.map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft border border-border hover:shadow-card transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-primary to-accent w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-display text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional AI Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              More <span className="text-primary italic">AI-Powered</span> Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Beyond mentorship, SwarChAI provides a complete ecosystem for your career growth
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalAIServices.map((service, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">Free for Everyone</span>
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-6 mt-2">
                  Why Choose <span className="text-primary italic">SwarChAI</span>?
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We believe everyone deserves access to quality mentorship and AI-powered career tools. 
                  Our community-driven platform removes barriers and connects you with the guidance you need to succeed—at no cost.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-primary/10 via-secondary to-accent/10 rounded-3xl p-8">
                <div className="bg-card rounded-2xl p-8 shadow-card">
                  <h3 className="text-2xl font-display text-foreground mb-4">Ready to Start?</h3>
                  <p className="text-muted-foreground mb-6">
                    Join thousands of users who are already accelerating their careers with SwarChAI—completely free.
                  </p>
                  <div className="space-y-3">
                    <Button variant="hero" size="lg" className="w-full" asChild>
                      <Link to="/signup">
                        Join the Community
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="w-full" asChild>
                      <Link to="/mentors">Explore Mentors</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
