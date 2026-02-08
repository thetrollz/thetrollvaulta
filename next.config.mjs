import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // We don't need wasm on the server for a static export
    if (isServer) {
      config.resolve.alias['./argon2.wasm'] = path.resolve(
        __dirname,
        'src/lib/empty-module.ts'
      );
      config.resolve.alias['./pqc_kyber_bg.wasm'] = path.resolve(
        __dirname,
        'src/lib/empty-module.ts'
      );
    }

    return config;
  },
};

export default nextConfig;
