import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
//  basePath: "/login"
images : {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      port: '',
      pathname: '/df2c5xndq/**',
      search: '',
    },
  ],
}
};

export default nextConfig;
