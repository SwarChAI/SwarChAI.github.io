import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Filter, Linkedin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mentorData } from "@/data/mentors";
import { useAuth } from "@/contexts/AuthContext";

const specialties = ["All", "Product Management", "Software Engineering", "UX Design", "Marketing", "Data Science", "Entrepreneurship"];

export default function Mentors() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredMentors = mentorData.filter((mentor) => {
    const matchesSearch = mentor.name.toLowerCase().includes(search.toLowerCase()) ||
      mentor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      `${mentor.role} at ${mentor.company}`.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || mentor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display text-foreground mb-4">
              Find Your <span className="text-primary italic">Perfect</span> Mentor
            </h1>
            <p className="text-muted-foreground mb-8">
              Browse our curated network of industry professionals ready to guide your journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, role, or specialty..."
                  className="pl-10 h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="default" size="lg">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Specialty Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialty === specialty
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="flex-1">
                    <Link to={`/mentors/${mentor.slug}`} className="font-display text-lg text-foreground hover:text-primary transition-colors">{mentor.name}</Link>
                    <p className="text-sm text-muted-foreground">{mentor.role} at {mentor.company}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-accent">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">• {mentor.sessions} sessions</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {mentor.specialty}
                  </span>
                  {mentor.industries.map((industry) => (
                    <span key={industry} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      {industry}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to={`/mentors/${mentor.slug}`}>
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No mentors found matching your criteria.</p>
              <Button variant="link" onClick={() => { setSearch(""); setSelectedSpecialty("All"); }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
