import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静态导出，产物为纯静态文件，可直接托管在 GitHub Pages 上。
  output: 'export',
};

export default nextConfig;
