import { API_CONFIG } from './config';
import { 
  SuccessStory, 
  successStoriesData, 
  getApprovedStories as getStaticApprovedStories,
  getFeaturedStory as getStaticFeaturedStory,
  getStoryBySlug as getStaticStoryBySlug 
} from '@/data/successStories';

export interface SuccessStorySubmission {
  name: string;
  email: string;
  role: string;
  previousRole: string;
  mentorName: string;
  quote: string;
  highlight: string;
  duration: string;
  linkedinUrl?: string;
}

// Fetch all approved success stories
export const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
  const source = API_CONFIG.MENTORS_SOURCE; // Reuse the same source config

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/success-stories?status=approved`);
    if (!response.ok) throw new Error('Failed to fetch success stories from WordPress');
    return response.json();
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/success-stories?status=approved`);
    if (!response.ok) throw new Error('Failed to fetch success stories from PostgreSQL API');
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/success-stories?status=approved`);
    if (!response.ok) throw new Error('Failed to fetch success stories from REST API');
    return response.json();
  }

  // Default: static
  return getStaticApprovedStories();
};

// Fetch featured story
export const fetchFeaturedStory = async (): Promise<SuccessStory | undefined> => {
  const source = API_CONFIG.MENTORS_SOURCE;

  if (source === 'wordpress' || source === 'postgresql' || source === 'rest') {
    const stories = await fetchSuccessStories();
    return stories.find((story) => story.featured);
  }

  return getStaticFeaturedStory();
};

// Fetch single story by slug
export const fetchStoryBySlug = async (slug: string): Promise<SuccessStory | undefined> => {
  const source = API_CONFIG.MENTORS_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/success-stories?slug=${slug}`);
    if (!response.ok) return undefined;
    const data = await response.json();
    return data[0];
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/success-stories/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/success-stories/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  return getStaticStoryBySlug(slug);
};

// Submit a new success story
export const submitSuccessStory = async (submission: SuccessStorySubmission): Promise<{ success: boolean; message: string }> => {
  const source = API_CONFIG.MENTORS_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/success-stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error('Failed to submit story to WordPress');
    return { success: true, message: 'Story submitted successfully!' };
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/success-stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error('Failed to submit story to PostgreSQL API');
    return { success: true, message: 'Story submitted successfully!' };
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/success-stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error('Failed to submit story to REST API');
    return { success: true, message: 'Story submitted successfully!' };
  }

  // Static mode - just simulate success
  console.log('Success story submission (static mode):', submission);
  return { success: true, message: 'Story submitted successfully! (Demo mode)' };
};
