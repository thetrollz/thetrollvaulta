import path from 'path';

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
