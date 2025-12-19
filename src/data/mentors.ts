export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  date: string;
}

export interface Mentor {
  id: number;
  name: string;
  slug: string;
  role: string;
  company: string;
  specialty: string;
  industries: string[];
  image: string;
  coverImage: string;
  rating: number;
  sessions: number;
  bio: string;
  fullBio: string;
  linkedin: string;
  experience: number;
  availability: string;
  languages: string[];
  expertise: string[];
  testimonials: Testimonial[];
}

export const mentorData: Mentor[] = [
  {
    id: 1,
    name: "Sarah Chen",
    slug: "sarah-chen",
    role: "Product Lead",
    company: "Stripe",
    specialty: "Product Management",
    industries: ["Fintech", "SaaS"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop",
    rating: 4.9,
    sessions: 127,
    bio: "10+ years in product, passionate about helping PMs level up their strategic thinking.",
    fullBio: "I've spent over a decade building products that millions of people use every day. Starting as a software engineer at a startup, I transitioned into product management because I wanted to be closer to the customer problems we were solving. At Stripe, I lead a team focused on making payments accessible to businesses of all sizes.\n\nMy approach to mentorship is deeply practical. I believe in working through real scenarios, whether that's helping you prepare for interviews, navigate stakeholder relationships, or think through complex product decisions. I've made plenty of mistakes along the way, and I'm committed to helping you avoid the ones I made.",
    linkedin: "https://linkedin.com/in/sarahchen",
    experience: 12,
    availability: "2-4 sessions/month",
    languages: ["English", "Mandarin"],
    expertise: ["Product Strategy", "Stakeholder Management", "Roadmapping", "User Research", "Go-to-Market"],
    testimonials: [
      {
        id: 1,
        name: "Amanda Chen",
        role: "Product Manager at Meta",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        content: "Sarah completely transformed how I think about product strategy. Her frameworks for prioritization and stakeholder management helped me land my dream job at Meta. She's incredibly generous with her time and insights.",
        rating: 5,
        date: "2024-11-15",
      },
    ],
  },
];

export function getMentorBySlug(slug: string): Mentor | undefined {
  return mentorData.find((mentor) => mentor.slug === slug);
}

export function getMentorById(id: number): Mentor | undefined {
  return mentorData.find((mentor) => mentor.id === id);
}
