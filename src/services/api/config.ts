// API Configuration - Update these values to match your backend
export type DataSource = 'wordpress' | 'postgresql' | 'rest' | 'static';

export const API_CONFIG = {
  // Choose your data source: 'wordpress' | 'postgresql' | 'rest' | 'static'
  MENTORS_SOURCE: 'static' as DataSource,
  BLOG_SOURCE: 'static' as DataSource,

  // WordPress REST API base URL
  WORDPRESS_API_URL: 'https://your-wordpress-site.com/wp-json/wp/v2',

  // PostgreSQL API endpoint (your backend that connects to PostgreSQL)
  POSTGRESQL_API_URL: 'https://your-api.com/api',

  // Custom REST API endpoints
  REST_API_URL: 'https://your-rest-api.com',
};
