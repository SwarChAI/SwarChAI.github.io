export interface SuccessStory {
  id: number;
  slug: string;
  name: string;
  role: string;
  previousRole: string;
  image: string;
  mentorName: string;
  mentorRole?: string;
  mentorImage?: string;
  quote: string;
  highlight: string;
  duration: string;
  featured?: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const successStoriesData: SuccessStory[] = [
  {
    id: 1,
    slug: "amanda-chen-meta",
    name: "Amanda Chen",
    role: "Product Manager at Meta",
    previousRole: "Junior Business Analyst",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    mentorName: "Sarah Chen",
    mentorRole: "Product Lead at Stripe",
    mentorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote: "Before SwarChAI, I felt stuck in my career with no clear path forward. Sarah helped me realize I had transferable skills for product management. Within 8 months of starting our mentorship, I landed my dream job at Meta.",
    highlight: "Salary increased by 85%",
    duration: "8 months",
    featured: true,
    status: 'approved',
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    slug: "james-wilson-amazon",
    name: "James Wilson",
    role: "Senior Software Engineer at Amazon",
    previousRole: "Bootcamp Graduate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    mentorName: "Marcus Johnson",
    quote: "Marcus taught me how to think like a senior engineer. His system design sessions completely changed how I approach problems. I went from struggling with interviews to getting offers from 3 FAANG companies.",
    highlight: "3 FAANG offers",
    duration: "6 months",
    status: 'approved',
    createdAt: "2024-02-10",
  },
];

export const getApprovedStories = (): SuccessStory[] => {
  return successStoriesData.filter((story) => story.status === 'approved');
};

export const getFeaturedStory = (): SuccessStory | undefined => {
  return successStoriesData.find((story) => story.featured && story.status === 'approved');
};

export const getStoryBySlug = (slug: string): SuccessStory | undefined => {
  return successStoriesData.find((story) => story.slug === slug);
};
