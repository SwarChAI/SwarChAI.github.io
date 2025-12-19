import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, Linkedin, Briefcase, MapPin, Loader2, ArrowLeft, Clock } from "lucide-react";

export default function MentorProfileEdit() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
    location: "",
    currentRole: "",
    company: "",
    bio: "",
    expertise: "",
    yearsExperience: "",
    specialties: [] as string[],
    availability: [] as string[],
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSaving(false);
    toast({
      title: "Profile updated",
      description: "Your mentor profile has been saved successfully.",
    });
  };

  const specialtyOptions = [
    "Product Management",
    "Software Engineering",
    "UX Design",
    "Data Science",
    "Marketing",
    "Leadership",
    "Entrepreneurship",
    "Career Transition",
  ];

  const availabilityOptions = [
    "Weekday Mornings",
    "Weekday Afternoons",
    "Weekday Evenings",
    "Weekend Mornings",
    "Weekend Afternoons",
  ];

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  const toggleAvailability = (slot: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(slot)
        ? prev.availability.filter((s) => s !== slot)
        : [...prev.availability, slot],
    }));
  };

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

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/mentor/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-4xl font-display text-foreground">
              Mentor <span className="text-primary italic">Profile</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Update your profile to help mentees find and connect with you
            </p>
          </div>
        </div>
      </section>

      {/* Profile Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Section */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">{formData.name || "Your Name"}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{formData.email}</p>
                    <Button type="button" variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <h2 className="text-xl font-display text-foreground mb-6">Basic Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      className="bg-secondary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Linkedin className="h-4 w-4 inline mr-2" />
                      LinkedIn Profile *
                    </label>
                    <Input
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="h-4 w-4 inline mr-2" />
                      Location
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <h2 className="text-xl font-display text-foreground mb-6">Professional Background</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Current Role *
                    </label>
                    <Input
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleChange}
                      placeholder="e.g., Senior Product Manager"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g., Google"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                    <Input
                      name="yearsExperience"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      placeholder="e.g., 10+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Primary Expertise</label>
                    <Input
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleChange}
                      placeholder="e.g., Product Strategy"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bio *</label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Share your background, experience, and what you enjoy mentoring others on..."
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <h2 className="text-xl font-display text-foreground mb-6">Mentoring Focus</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-foreground mb-3">
                    What topics can you mentor on? *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {specialtyOptions.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => toggleSpecialty(specialty)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.specialties.includes(specialty)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <h2 className="text-xl font-display text-foreground mb-6">
                  <Clock className="h-5 w-5 inline mr-2" />
                  Availability
                </h2>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    When are you typically available for sessions?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availabilityOptions.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => toggleAvailability(slot)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          formData.availability.includes(slot)
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-primary/20"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" asChild>
                  <Link to="/mentor/dashboard">Cancel</Link>
                </Button>
                <Button type="submit" variant="hero" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}