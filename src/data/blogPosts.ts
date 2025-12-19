export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-get-the-most-out-of-mentorship-sessions",
    title: "How to Get the Most Out of Your Mentorship Sessions",
    excerpt: "Preparation is key to maximizing the value of your mentor meetings. Here are 7 strategies that our most successful mentees use.",
    content: `
## The Power of Preparation

Mentorship is one of the most valuable resources for career growth, but the value you extract depends largely on how you approach each session. After working with thousands of mentor-mentee pairs, we've identified the key habits that separate successful mentees from those who struggle to make progress.

### 1. Come With Specific Questions

Generic questions get generic answers. Instead of asking "How do I advance my career?", try "I'm considering transitioning from engineering to product management. What specific skills should I develop first?"

The more specific your questions, the more actionable the advice you'll receive.

### 2. Share Context Ahead of Time

Send your mentor a brief agenda 24 hours before your meeting. Include:
- What you've accomplished since your last session
- Current challenges you're facing
- Specific topics you want to discuss

This allows your mentor to come prepared with relevant insights and resources.

### 3. Take Notes and Follow Up

During the session, take detailed notes. After the session, send a quick summary to your mentor highlighting:
- Key takeaways
- Action items you've committed to
- Any follow-up questions

This creates accountability and shows your mentor that you value their time.

### 4. Be Honest About Struggles

Your mentor can only help if they understand your real challenges. Don't try to impress them with a highlight reel—be vulnerable about where you're struggling.

### 5. Implement Before the Next Session

The biggest mistake mentees make is not taking action between sessions. Set a goal to implement at least one piece of advice before your next meeting.

### 6. Track Your Progress

Keep a simple log of:
- Advice received
- Actions taken
- Results achieved

This helps you and your mentor measure the impact of your work together.

### 7. Express Gratitude

A simple thank you goes a long way. Your mentor is volunteering their time—let them know it's making a difference.

## Ready to Start?

If you're not currently working with a mentor, there's no better time to start. Browse our mentors and find someone who aligns with your goals.
    `,
    author: "Sample Blogger",
    authorRole: "Head of Community at SwarChAI",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Tips & Advice",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop",
    tags: ["mentorship", "career growth", "productivity"],
  },
  
];

export const categories = ["All", "Tips & Advice", "Success Stories", "Career Advice", "Community"];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return blogPosts.slice(0, limit);
  
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, limit);
}
