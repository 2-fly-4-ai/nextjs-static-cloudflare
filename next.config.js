const path = require("path");
const allowedImageWordPressDomain = new URL(
  process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
).hostname;

module.exports = {
  async redirects(NEXT_PUBLIC_WORDPRESS_SITE_URL) {
    return [
      {
        source: "/post-sitemap.xml",
        destination:
          "https://staging-petsmarketplace-staging.kinsta.cloud/post-sitemap.xml",
        permanent: false,
        basePath: false,
      },
      {
        source: "/page-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/page-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
      {
        source: "/product-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/product-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
      {
        source: "/category-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/category-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
      {
        source: "/product_taxonomy-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/product_taxonomy-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
      {
        source: "/product_tag-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/product_tag-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
      {
        source: "/product_brand-sitemap.xml",
        destination: `${NEXT_PUBLIC_WORDPRESS_SITE_URL}/product_brand-sitemap.xml`,
        permanent: false,
        basePath: false,
      },
    ];
  },
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      allowedImageWordPressDomain,
      "staging-petsmarketplace-staging.kinsta.cloud",
      "m.media-amazon.com",
      "via.placeholder.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "flowbite.s3.amazonaws.com",
      "s7d2.scene7.com",
      "i.pinimg.com",
      "localhost",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
