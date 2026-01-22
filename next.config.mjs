/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [],
    },
    experimental: {
        scrollRestoration: true,
    },
};

export default nextConfig;
