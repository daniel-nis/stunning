/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //domains: ["qliwrxwpocxqxoayomeb.supabase.co"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qliwrxwpocxqxoayomeb.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**',
      },
    ],
  },
  output: "standalone",
  serverRuntimeConfig: {
    functionTimeout: 60 * 1000, // 60 seconds
  },
};

export default nextConfig;
