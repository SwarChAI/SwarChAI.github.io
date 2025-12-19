import { API_CONFIG } from './config';
import { Mentor, mentorData, getMentorBySlug as getStaticMentorBySlug } from '@/data/mentors';

// WordPress API response type (customize based on your WP setup)
interface WPMentorResponse {
  id: number;
  title: { rendered: string };
  acf?: Record<string, unknown>; // ACF fields
  // Add your WordPress custom fields here
}

// Transform WordPress response to Mentor type
const transformWPMentor = (wp: WPMentorResponse): Mentor => {
  // Customize this based on your WordPress custom fields
  return {
    id: wp.id,
    name: wp.title.rendered,
    slug: wp.title.rendered.toLowerCase().replace(/\s+/g, '-'),
    role: (wp.acf?.role as string) || '',
    company: (wp.acf?.company as string) || '',
    specialty: (wp.acf?.specialty as string) || '',
    industries: (wp.acf?.industries as string[]) || [],
    image: (wp.acf?.image as string) || '/placeholder.svg',
    coverImage: (wp.acf?.cover_image as string) || '',
    rating: (wp.acf?.rating as number) || 0,
    sessions: (wp.acf?.sessions as number) || 0,
    bio: (wp.acf?.bio as string) || '',
    fullBio: (wp.acf?.full_bio as string) || '',
    expertise: (wp.acf?.expertise as string[]) || [],
    experience: (wp.acf?.experience as number) || 0,
    availability: (wp.acf?.availability as string) || '',
    languages: (wp.acf?.languages as string[]) || [],
    linkedin: (wp.acf?.linkedin as string) || '',
    testimonials: [],
  };
};

// Fetch all mentors
export const fetchMentors = async (): Promise<Mentor[]> => {
  const source = API_CONFIG.MENTORS_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/mentors`);
    if (!response.ok) throw new Error('Failed to fetch mentors from WordPress');
    const data: WPMentorResponse[] = await response.json();
    return data.map(transformWPMentor);
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/mentors`);
    if (!response.ok) throw new Error('Failed to fetch mentors from PostgreSQL API');
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/mentors`);
    if (!response.ok) throw new Error('Failed to fetch mentors from REST API');
    return response.json();
  }

  // Default: static
  return mentorData;
};

// Fetch single mentor by slug
export const fetchMentorBySlug = async (slug: string): Promise<Mentor | undefined> => {
  const source = API_CONFIG.MENTORS_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/mentors?slug=${slug}`);
    if (!response.ok) throw new Error('Failed to fetch mentor from WordPress');
    const data: WPMentorResponse[] = await response.json();
    return data[0] ? transformWPMentor(data[0]) : undefined;
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/mentors/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/mentors/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  // Default: static
  return getStaticMentorBySlug(slug);
};
