/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        implementation: 'sass-embedded'
    },
    eslint: {
        ignoreDuringBuilds: process.env.NODE_ENV === 'production'
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/:path*`
            },
            {
                source: '/uploads/:path*',
                destination: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/uploads/:path*`
            },
            {
                source: '/generated/:path*',
                destination: `${process.env.NEXT_PUBLIC_OPEN_AI_URL}/:path*`
            }
        ];
    }
};

export default nextConfig;
