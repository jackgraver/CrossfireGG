import type { NextConfig } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_BASE;

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: "standalone",

    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${BASE_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
