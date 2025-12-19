import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  fetchSuccessStories, 
  fetchFeaturedStory, 
  fetchStoryBySlug, 
  submitSuccessStory,
  SuccessStorySubmission 
} from '@/services/api/successStoriesApi';

export const useSuccessStories = () => {
  return useQuery({
    queryKey: ['successStories'],
    queryFn: fetchSuccessStories,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedStory = () => {
  return useQuery({
    queryKey: ['featuredStory'],
    queryFn: fetchFeaturedStory,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSuccessStory = (slug: string) => {
  return useQuery({
    queryKey: ['successStory', slug],
    queryFn: () => fetchStoryBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSubmitSuccessStory = () => {
  return useMutation({
    mutationFn: (submission: SuccessStorySubmission) => submitSuccessStory(submission),
  });
};
