import { getCollection } from 'astro:content';

export async function GET() {
  const baseUrl = 'https://judetejada.dev';
  
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

  const blogUrls = blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    lastmod: new Date(post.data.publishedAt).toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  }));

  const projectUrls = projects.map(project => ({
    url: `/project/${project.slug}`,
    lastmod: new Date(project.data.publishedAt).toISOString(),
    changefreq: 'monthly',
    priority: '0.8'
  }));

  const staticPages = pages.map(url => ({
    url,
    lastmod: new Date().toISOString(),
    changefreq: url === '' ? 'weekly' : 'monthly',
    priority: url === '' ? '1.0' : '0.7'
  }));

  const allUrls = [...staticPages, ...blogUrls, ...projectUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}