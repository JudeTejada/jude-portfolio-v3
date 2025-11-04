import { getCollection } from 'astro:content';

export async function GET() {
  const pages = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/project',
  ];

  // Get all blog posts
  const blogPosts = await getCollection('blog', ({ data }) => {
    return data.isPublished !== false;
  });

  // Get all projects
  const projects = await getCollection('project', ({ data }) => {
    return data.isPublished !== false;
  });

  const blogUrls = blogPosts.map(post => `/blog/${post.slug}`);
  const projectUrls = projects.map(project => `/project/${project.slug}`);

  const allUrls = [...pages, ...blogUrls, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `
  <url>
    <loc>https://judetejada.com${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}