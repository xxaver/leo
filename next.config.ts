import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        return {
            ...config,
            module: {
                ...config.module,
                rules: [
                    ...config.module.rules,
                    {test: /\.txt$/, use: 'raw-loader'},
                    {test: /\.md$/, use: 'raw-loader'}
                ]
            }
        };
    }
};

export default nextConfig;
