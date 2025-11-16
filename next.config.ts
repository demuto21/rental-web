/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... vous avez peut-être d'autres configurations ici ...

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // '/**' signifie "autoriser tous les chemins sur ce site"
      },
      // Vous pouvez ajouter d'autres domaines ici si besoin
    ],
  },
};

module.exports = nextConfig;