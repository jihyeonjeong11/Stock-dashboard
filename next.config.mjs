import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
        port: "",
        pathname: "/file/publicdatany/finnhubimage/stock_logo/***",
        search: "",
      },
    ],
  },
};

export default withMDX(config);
