/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["qliwrxwpocxqxoayomeb.supabase.co"],
  },
  output: "standalone",
  serverRuntimeConfig: {
    functionTimeout: 60 * 1000, // 60 seconds
  },
};

export default nextConfig;
