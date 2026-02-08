
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, dev }) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    config.output.webassemblyModuleFilename =
      isServer && !dev
        ? '../static/wasm/[modulehash].wasm'
        : 'static/wasm/[modulehash].wasm';

    config.module.parser.javascript.wasmEnabled = true;

    return config;
  },
};

export default nextConfig;
