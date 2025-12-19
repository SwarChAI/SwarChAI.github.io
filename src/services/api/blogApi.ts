import { API_CONFIG } from './config';
import { BlogPost, blogPosts, getBlogPostBySlug as getStaticBlogPostBySlug, getRelatedPosts as getStaticRelatedPosts, categories } from '@/data/blogPosts';

// WordPress API response type
interface WPPostResponse {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    'wp:term'?: Array<Array<{ name: string; slug: string }>>;
  };
}

// Transform WordPress response to BlogPost type
const transformWPPost = (wp: WPPostResponse): BlogPost => {
  const author = wp._embedded?.author?.[0];
  const featuredMedia = wp._embedded?.['wp:featuredmedia']?.[0];
  const terms = wp._embedded?.['wp:term'] || [];
  const wpCategories = terms[0] || [];
  const tags = terms[1] || [];

  return {
    id: wp.id,
    slug: wp.slug,
    title: wp.title.rendered,
    excerpt: wp.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    content: wp.content.rendered,
    author: author?.name || 'Unknown',
    authorRole: 'Contributor',
    authorImage: author?.avatar_urls?.['96'] || '/placeholder.svg',
    date: new Date(wp.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: `${Math.ceil(wp.content.rendered.split(' ').length / 200)} min read`,
    category: wpCategories[0]?.name || 'General',
    tags: tags.map((t) => t.name),
    image: featuredMedia?.source_url || '/placeholder.svg',
  };
};

// Fetch all blog posts
export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const source = API_CONFIG.BLOG_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(
      `${API_CONFIG.WORDPRESS_API_URL}/posts?_embed&per_page=100`
    );
    if (!response.ok) throw new Error('Failed to fetch posts from WordPress');
    const data: WPPostResponse[] = await response.json();
    return data.map(transformWPPost);
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts from PostgreSQL API');
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts from REST API');
    return response.json();
  }

  // Default: static
  return blogPosts;
};

// Fetch single blog post by slug
export const fetchBlogPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const source = API_CONFIG.BLOG_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(
      `${API_CONFIG.WORDPRESS_API_URL}/posts?_embed&slug=${slug}`
    );
    if (!response.ok) throw new Error('Failed to fetch post from WordPress');
    const data: WPPostResponse[] = await response.json();
    return data[0] ? transformWPPost(data[0]) : undefined;
  }

  if (source === 'postgresql') {
    const response = await fetch(`${API_CONFIG.POSTGRESQL_API_URL}/posts/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  if (source === 'rest') {
    const response = await fetch(`${API_CONFIG.REST_API_URL}/posts/${slug}`);
    if (!response.ok) return undefined;
    return response.json();
  }

  // Default: static
  return getStaticBlogPostBySlug(slug);
};

// Fetch related posts
export const fetchRelatedPosts = async (
  currentSlug: string,
  limit: number = 3
): Promise<BlogPost[]> => {
  const source = API_CONFIG.BLOG_SOURCE;

  if (source === 'wordpress' || source === 'postgresql' || source === 'rest') {
    // For dynamic sources, fetch all and filter client-side
    const allPosts = await fetchBlogPosts();
    const currentPost = allPosts.find((p) => p.slug === currentSlug);
    if (!currentPost) return [];

    return allPosts
      .filter((p) => p.slug !== currentSlug && p.category === currentPost.category)
      .slice(0, limit);
  }

  // Default: static
  return getStaticRelatedPosts(currentSlug, limit);
};

// Fetch categories
export const fetchCategories = async (): Promise<string[]> => {
  const source = API_CONFIG.BLOG_SOURCE;

  if (source === 'wordpress') {
    const response = await fetch(`${API_CONFIG.WORDPRESS_API_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories from WordPress');
    const data: Array<{ name: string }> = await response.json();
    return data.map((c) => c.name);
  }

  if (source === 'postgresql' || source === 'rest') {
    const posts = await fetchBlogPosts();
    return [...new Set(posts.map((p) => p.category))];
  }

  // Default: static
  return categories;
};
