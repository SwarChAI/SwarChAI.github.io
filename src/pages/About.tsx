import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Lightbulb, Globe, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Accessibility",
    description: "Quality mentorship should be available to everyone, regardless of background or financial means.",
  },
  {
    icon: Lightbulb,
    title: "Growth Mindset",
    description: "We believe in continuous learning and the power of guidance to unlock human potential.",
  },
  {
    icon: Globe,
    title: "Community",
    description: "Building a global network of mentors and mentees who support each other's journeys.",
  },
  {
    icon: Users,
    title: "Diversity",
    description: "Championing diverse perspectives and experiences across all industries and backgrounds.",
  },
];

const team = [
  {
    name: "Swarnima Shrivastava",
    role: "Founder",
    image: "<upload image here>",
    bio: "My bio",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6 animate-fade-up">
              Our Mission to <span className="text-primary italic">Democratize</span> Mentorship
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              We're building a community where everyone has access to the guidance they need to succeed without a cost associated to it.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-display text-foreground mt-2 mb-6">
                From a Simple Idea to a Growing Movement
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                SwarChAI was founded in 2026 by ABC and DEF, two tech veterans with over a decade of industry experience each. They noticed a glaring gap in professional development: while mentorship was proven to accelerate careers, access to quality mentors remained limited to those with existing networks or financial resources.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                What started as a simple idea has grown into an AI-powered ecosystem helping hundreds of users across 10+ industries. Our commitment remains the same: meaningful growth tools, completely free for everyone.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-card"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-lg">
                <div className="text-3xl font-display">500+</div>
                <div className="text-sm opacity-80">Lives Changed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-shadow">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate professionals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-4 ring-secondary"
                />
                <h3 className="font-display text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display mb-6">
            Join Our Mission
          </h2>
          <p className="opacity-80 max-w-2xl mx-auto mb-8">
            Whether you are looking for guidance or ready to give back, there is a place for you at SwarChAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/signup">
                Find a Mentor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link to="/become-mentor">
                Become a Mentor
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
