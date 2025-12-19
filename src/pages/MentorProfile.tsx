import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { getMentorBySlug, Testimonial } from "@/data/mentors";
import { BookingModal } from "@/components/BookingModal";
import { 
  Star, 
  Calendar, 
  Clock, 
  Globe, 
  Linkedin, 
  ArrowLeft, 
  ArrowRight,
  MessageSquare,
  Award,
  Quote,
  Send
} from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function MentorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const mentor = slug ? getMentorBySlug(slug) : undefined;
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mentor?.testimonials || []);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
  });

  if (!mentor) {
    return <Navigate to="/mentors" replace />;
  }

  const handleSubmitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTestimonial.name || !newTestimonial.content) {
      toast.error("Please fill in your name and testimonial");
      return;
    }

    const testimonial: Testimonial = {
      id: Date.now(),
      name: newTestimonial.name,
      role: newTestimonial.role || "Mentee",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      content: newTestimonial.content,
      rating: newTestimonial.rating,
      date: new Date().toISOString().split('T')[0],
    };

    setTestimonials([testimonial, ...testimonials]);
    setNewTestimonial({ name: "", role: "", content: "", rating: 5 });
    setShowTestimonialForm(false);
    toast.success("Thank you for your testimonial!");
  };

  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={mentor.coverImage}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Profile Header */}
      <section className="relative -mt-32 pb-8">
        <div className="container mx-auto px-4">
          <Link 
            to="/mentors" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Mentors
          </Link>
          
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={mentor.image}
                alt={mentor.name}
                className="w-32 h-32 rounded-2xl object-cover ring-4 ring-primary/20"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-display text-foreground">
                    {mentor.name}
                  </h1>
                  <div className="flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-medium">{mentor.rating}</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  {mentor.role} at {mentor.company}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    {mentor.experience} years experience
                  </span>
                  <span className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    {mentor.sessions} sessions completed
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    {mentor.availability}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    {mentor.languages.join(", ")}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg" onClick={() => setShowBookingModal(true)}>
                    Request Session
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                      Connect on LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - About & Expertise */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                <h2 className="text-2xl font-display text-foreground mb-4">About</h2>
                <div className="prose prose-gray max-w-none">
                  {mentor.fullBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                <h2 className="text-2xl font-display text-foreground mb-4">Areas of Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Testimonials */}
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display text-foreground">
                    Testimonials ({testimonials.length})
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowTestimonialForm(!showTestimonialForm)}
                  >
                    {showTestimonialForm ? "Cancel" : "Add Testimonial"}
                  </Button>
                </div>

                {/* Add Testimonial Form */}
                {showTestimonialForm && (
                  <form onSubmit={handleSubmitTestimonial} className="bg-secondary/50 rounded-xl p-6 mb-6 space-y-4">
                    <h3 className="font-display text-lg text-foreground mb-4">Share Your Experience</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Your Name *</label>
                        <Input
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Your Role</label>
                        <Input
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          placeholder="Product Manager at Company"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setNewTestimonial({ ...newTestimonial, rating })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 transition-colors ${
                                rating <= newTestimonial.rating
                                  ? "text-accent fill-accent"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Your Testimonial *</label>
                      <Textarea
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                        placeholder="Share your experience working with this mentor..."
                        rows={4}
                      />
                    </div>
                    <Button type="submit" variant="hero">
                      Submit Testimonial
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}

                {/* Testimonials List */}
                <div className="space-y-6">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="border-b border-border pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground">{testimonial.name}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-accent fill-accent" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                          <p className="text-muted-foreground leading-relaxed">
                            <Quote className="h-4 w-4 inline-block text-primary/40 mr-1" />
                            {testimonial.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(testimonial.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="font-display text-lg text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Specialty</span>
                    <span className="font-medium text-foreground">{mentor.specialty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sessions</span>
                    <span className="font-medium text-foreground">{mentor.sessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      {mentor.rating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium text-foreground">{mentor.experience} years</span>
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div className="bg-card rounded-2xl p-6 shadow-soft border border-border">
                <h3 className="font-display text-lg text-foreground mb-4">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.industries.map((industry) => (
                    <span
                      key={industry}
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-display text-lg text-foreground mb-2">Ready to Connect?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Start your mentorship journey with {mentor.name.split(' ')[0]} today.
                </p>
                <Button variant="hero" className="w-full" onClick={() => setShowBookingModal(true)}>
                  Request Session
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        mentor={{
          name: mentor.name,
          role: mentor.role,
          company: mentor.company,
          image: mentor.image,
          specialty: mentor.specialty,
        }}
      />
    </Layout>
  );
}
