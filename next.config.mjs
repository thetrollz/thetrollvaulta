import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

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
