import { Link } from "react-router-dom";
import { ArrowRight, Users, Target, Sparkles, Star, Brain, Rocket, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

const mentors = [
  {
    name: "Sarah Chen",
    role: "Product Lead at Stripe",
    specialty: "Product Management",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.9,
  },
  {
    name: "Marcus Johnson",
    role: "Senior Engineer at Google",
    specialty: "Software Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 5.0,
  },
  {
    name: "Emily Rodriguez",
    role: "Design Director at Airbnb",
    specialty: "UX Design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating: 4.8,
  },
];

const services = [
  {
    icon: Users,
    title: "AI Mentorship",
    description: "Connect with industry professionals matched by our AI for personalized career guidance.",
    link: "/mentors",
  },
  {
    icon: Brain,
    title: "AI Learning Paths",
    description: "Customized learning journeys powered by AI to help you master new skills efficiently.",
    link: "/how-it-works",
  },
  {
    icon: Rocket,
    title: "Career Acceleration",
    description: "AI-driven insights and recommendations to fast-track your professional growth.",
    link: "/signup",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Curated content and guides handpicked by our AI based on your learning goals.",
    link: "/blog",
  },
];

const features = [
  {
    icon: Users,
    title: "Expert Mentors",
    description: "Connect with industry professionals from top companies ready to share their knowledge.",
  },
  {
    icon: Target,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm matches you with mentors based on your goals and learning style.",
  },
  {
    icon: Sparkles,
    title: "100% Free",
    description: "No hidden fees or subscriptions. Quality mentorship should be accessible to everyone.",
  },
];

const testimonials = [
  {
    quote: "SwarChAI connected me with a mentor who helped me land my dream job at a FAANG company. Forever grateful!",
    author: "Alex Kim",
    role: "Software Engineer at Meta",
  },
  {
    quote: "The AI-powered matching was spot-on. My mentor understood exactly where I was in my career journey.",
    author: "Priya Sharma",
    role: "Product Manager at Shopify",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-up">
              <Brain className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Growth Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Unlock Your Potential with{" "}
              <span className="text-primary italic">SwarChAI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              An AI-powered ecosystem for learning, mentorship, and career growth. Get personalized guidance, connect with experts, and accelerate your journey—all for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/how-it-works">See How It Works</Link>
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-center">
                <div className="text-3xl font-display text-foreground">50+</div>
                <div className="text-sm">Expert Mentors</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-display text-foreground">500+</div>
                <div className="text-sm">Users Helped</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-display text-foreground">10+</div>
                <div className="text-sm">AI Features</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              What SwarChAI Offers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive suite of AI-powered tools designed to accelerate your growth
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Link
                key={service.title}
                to={service.link}
                className="group text-center p-8 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-teal text-primary-foreground mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Featured Service</span>
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4 mt-2">
              AI-Powered Mentorship
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with industry leaders matched by our intelligent algorithm
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mentors.map((mentor, index) => (
              <div
                key={mentor.name}
                className="bg-background rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20"
                  />
                  <div className="absolute bottom-0 right-1/2 translate-x-8 translate-y-1 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" />
                    {mentor.rating}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-xl text-foreground mb-1">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{mentor.role}</p>
                  <span className="inline-block bg-secondary text-secondary-foreground text-xs px-3 py-1 rounded-full">
                    {mentor.specialty}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="default" size="lg" asChild>
              <Link to="/mentors">
                Explore Mentorship
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              Why Choose SwarChAI?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine AI technology with human expertise to accelerate your growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="text-center p-8 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-teal text-primary-foreground mb-6">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display mb-4">
              Success Stories
            </h2>
            <p className="opacity-80 max-w-2xl mx-auto">
              Hear from users who have transformed their careers with SwarChAI
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.author}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8"
              >
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm opacity-80">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Meet Our Founders</span>
              <h2 className="text-3xl md:text-4xl font-display text-foreground mt-2 mb-6">
                Building the Future of Learning
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                "We started SwarChAI with a vision to democratize access to quality guidance and education. By combining AI technology with human mentorship, we can help everyone unlock their full potential."
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
                  alt="ABC, Co-Founder"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20"
                />
                <h3 className="font-display text-xl text-foreground mb-1">ABC</h3>
                <p className="text-primary text-sm font-medium mb-2">Co-Founder & CEO</p>
                <p className="text-muted-foreground text-sm">Over a decade of tech industry experience, passionate about democratizing education.</p>
              </div>
              <div className="text-center p-8 rounded-2xl bg-card shadow-soft">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
                  alt="DEF, Co-Founder"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary/20"
                />
                <h3 className="font-display text-xl text-foreground mb-1">DEF</h3>
                <p className="text-primary text-sm font-medium mb-2">Co-Founder & CTO</p>
                <p className="text-muted-foreground text-sm">Over a decade of tech industry experience, building AI-powered solutions for learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-warm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-accent-foreground mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-accent-foreground/80 max-w-2xl mx-auto mb-8">
            Join our growing community leveraging AI-powered tools and expert mentorship—completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" asChild>
              <Link to="/signup">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-foreground/50 text-foreground bg-background/10 hover:bg-background/20" asChild>
              <Link to="/become-mentor">Become a Mentor</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
