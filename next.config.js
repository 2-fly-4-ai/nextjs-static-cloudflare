const path = require('path')
const allowedImageWordPressDomain = new URL(process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL).hostname;


module.exports = {
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: [allowedImageWordPressDomain, 'staging-petsmarketplace-staging.kinsta.cloud', "m.media-amazon.com", "via.placeholder.com", "cdn.pixabay.com"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
}