import { Layout } from "@/components/layout/Layout";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  Shield, 
  Heart,
  Users,
  Target,
  AlertCircle
} from "lucide-react";

const mentorGuidelines = [
  {
    icon: Clock,
    title: "Time Commitment",
    description: "Commit to at least 2-4 sessions per month. Each session typically lasts 30-60 minutes. Consistency is key to building a meaningful relationship.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description: "Respond to mentee messages within 48 hours. Be proactive in scheduling and clear about your availability.",
  },
  {
    icon: Heart,
    title: "Empathy & Support",
    description: "Create a safe, non-judgmental space. Listen actively and provide encouragement alongside constructive feedback.",
  },
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description: "Help mentees set clear, achievable goals. Track progress together and celebrate milestones.",
  },
];

const menteeGuidelines = [
  {
    icon: Target,
    title: "Come Prepared",
    description: "Have clear questions or topics for each session. Take notes and follow up on action items.",
  },
  {
    icon: Clock,
    title: "Respect Time",
    description: "Be punctual for sessions. If you need to reschedule, provide at least 24 hours notice.",
  },
  {
    icon: MessageSquare,
    title: "Communicate Openly",
    description: "Share your challenges honestly. The more open you are, the better your mentor can help.",
  },
  {
    icon: Users,
    title: "Be Coachable",
    description: "Come with an open mind. Be willing to receive feedback and try new approaches.",
  },
];

const dosList = [
  "Be respectful and professional in all interactions",
  "Maintain confidentiality about personal matters shared",
  "Give and receive constructive feedback gracefully",
  "Set clear expectations at the start of the relationship",
  "Celebrate progress and acknowledge growth",
  "Be honest about what's working and what isn't",
];

const dontsList = [
  "Share personal contact information outside the platform",
  "Request or offer payment for mentorship services",
  "Use inappropriate language or behavior",
  "Ghost your mentor or mentee without explanation",
  "Share sensitive information with third parties",
  "Pressure for commitments beyond agreed terms",
];

export default function Guidelines() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Community Standards
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
              Mentorship <span className="text-primary italic">Guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Creating meaningful mentorship relationships requires commitment from both sides. 
              These guidelines help ensure a positive experience for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* For Mentors */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4 text-center">
              For <span className="text-primary italic">Mentors</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              As a mentor, you have the power to shape someone's career. Here's how to make the most impact.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {mentorGuidelines.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border"
                >
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Mentees */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4 text-center">
              For <span className="text-accent italic">Mentees</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Get the most out of your mentorship by coming prepared and staying engaged.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {menteeGuidelines.map((item, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-6 shadow-soft border border-border"
                >
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-display text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-12 text-center">
              Community <span className="text-primary italic">Standards</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Do's */}
              <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-display text-foreground">Do's</h3>
                </div>
                <ul className="space-y-4">
                  {dosList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Don'ts */}
              <div className="bg-destructive/5 rounded-2xl p-8 border border-destructive/20">
                <div className="flex items-center gap-3 mb-6">
                  <XCircle className="h-8 w-8 text-destructive" />
                  <h3 className="text-2xl font-display text-foreground">Don'ts</h3>
                </div>
                <ul className="space-y-4">
                  {dontsList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AlertCircle className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-display text-foreground mb-4">
              Need to Report an Issue?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you experience any behavior that violates these guidelines, please contact our 
              support team immediately. We take all reports seriously and handle them with discretion.
            </p>
            <a 
              href="mailto:support@swarchai.com" 
              className="text-primary hover:underline font-medium"
            >
              support@swarchai.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
