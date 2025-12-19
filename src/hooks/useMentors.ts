import { useQuery } from '@tanstack/react-query';
import { fetchMentors, fetchMentorBySlug } from '@/services/api/mentorsApi';

export const useMentors = () => {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: fetchMentors,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMentor = (slug: string) => {
  return useQuery({
    queryKey: ['mentor', slug],
    queryFn: () => fetchMentorBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
