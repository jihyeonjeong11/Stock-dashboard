import { createMDX } from "fumadocs-mdx/next";
import withBundleAnalyzerFn from "@next/bundle-analyzer";

const withMDX = createMDX();
const withBundleAnalyzer = withBundleAnalyzerFn({
  enabled: process.env.ANALYZE === "true",
});

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
