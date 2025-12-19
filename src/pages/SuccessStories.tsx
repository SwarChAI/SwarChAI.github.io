import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Quote, ArrowRight, Star, TrendingUp, Users, Award } from "lucide-react";

const featuredStory = {
  name: "Sample Mentee",
  role: "Senior Software Engineer at Amazon",
  previousRole: "Junior Business Analyst",
  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  mentorName: "sample Mentor",
  mentorRole: "Product Lead at Stripe",
  mentorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  quote: "Before SwarChAI, I felt stuck in my career with no clear path forward. Sarah helped me realize I had transferable skills for product management. Within 8 months of starting our mentorship, I landed my dream job at Meta.",
  highlight: "Salary increased by 85%",
  duration: "8 months",
};

const stories = [
  {
    name: "Sample Mentee",
    role: "Senior Software Engineer at Amazon",
    previousRole: "Bootcamp Graduate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    mentorName: "sample Mentor",
    mentorRole: "Principle Lead at Stripe",
    quote: "Before SwarChAI, I felt stuck in my career with no clear path forward. Sarah helped me realize I had transferable skills for product management. Within 8 months of starting our mentorship, I landed my dream job at Meta.",
    highlight: "Salary increased by 85%",
    duration: "6 months",
  },
];

const stats = [
  { icon: Users, value: "5,000+", label: "Successful Matches" },
  { icon: TrendingUp, value: "73%", label: "Achieved Their Goals" },
  { icon: Award, value: "4.9/5", label: "Average Rating" },
];

export default function SuccessStories() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4" />
              Real Stories, Real Impact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-foreground mb-6">
              Success <span className="text-primary italic">Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how SwarChAI has helped thousands of professionals transform their careers 
              through the power of AI and mentorship.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-display text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 via-secondary to-accent/10 rounded-3xl p-8 md:p-12">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-6">
                Featured Story
              </span>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Quote className="h-10 w-10 text-primary/40 mb-4" />
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6 italic">
                    "{featuredStory.quote}"
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <div className="font-display text-foreground">{featuredStory.name}</div>
                      <div className="text-sm text-muted-foreground">{featuredStory.role}</div>
                      <div className="text-xs text-muted-foreground">Previously: {featuredStory.previousRole}</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-card rounded-lg px-4 py-2">
                      <div className="text-sm text-muted-foreground">Result</div>
                      <div className="font-semibold text-primary">{featuredStory.highlight}</div>
                    </div>
                    <div className="bg-card rounded-lg px-4 py-2">
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-semibold text-foreground">{featuredStory.duration}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="text-sm text-muted-foreground mb-4">Mentored by</div>
                  <div className="flex items-center gap-4">
                    <img
                      src={featuredStory.mentorImage}
                      alt={featuredStory.mentorName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-accent/20"
                    />
                    <div>
                      <div className="font-display text-lg text-foreground">{featuredStory.mentorName}</div>
                      <div className="text-sm text-muted-foreground">{featuredStory.mentorRole}</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6" asChild>
                    <Link to="/mentors">View Mentor Profile</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Stories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              More <span className="text-primary italic">Inspiring</span> Journeys
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every mentorship journey is unique. Here are more stories from our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-soft border border-border hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-display text-foreground">{story.name}</div>
                    <div className="text-xs text-muted-foreground">{story.role}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4 italic">
                  "{story.quote}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Mentored by</div>
                    <div className="text-sm font-medium text-foreground">{story.mentorName}</div>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {story.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              Write Your Own <span className="text-primary italic">Success Story</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of professionals who have transformed their careers with SwarChAI.
            </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">
                Start Your Journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/share-story">
                Share Your Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/mentors">Browse Mentors</Link>
            </Button>
          </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
