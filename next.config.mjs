import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['./argon2.wasm'] = path.resolve(
        __dirname,
        'src/lib/empty-module.ts'
      );
    }

    return config;
  },
};

export default nextConfig;
