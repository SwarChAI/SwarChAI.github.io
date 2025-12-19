import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts, fetchBlogPostBySlug, fetchRelatedPosts, fetchCategories } from '@/services/api/blogApi';

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRelatedPosts = (currentSlug: string, limit: number = 3) => {
  return useQuery({
    queryKey: ['relatedPosts', currentSlug, limit],
    queryFn: () => fetchRelatedPosts(currentSlug, limit),
    enabled: !!currentSlug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
