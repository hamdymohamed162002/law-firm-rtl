module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com", // covers your Strapi Cloud media CDN
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/uploads/**",
      },
    ],
  },
};
