// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["qliwrxwpocxqxoayomeb.supabase.co"],
//   },
//   output: "standalone",
//   serverRuntimeConfig: {
//     functionTimeout: 60 * 1000, // 60 seconds
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["qliwrxwpocxqxoayomeb.supabase.co"],
  },
  serverRuntimeConfig: {
    functionTimeout: 60 * 1000, // 60 seconds
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      use: [
        {
          loader: "next-disable-next-client-script-loader",
          options: {
            exclude: /node_modules/,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
