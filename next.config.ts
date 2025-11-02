import type { NextConfig } from "next";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: 'nodejs',  // ← Используй Node.js вместо Edge
  },
};

module.exports = nextConfig;
