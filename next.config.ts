// import bundleAnalyzer from '@next/bundle-analyzer'
import { redirects, rewrites } from 'custom_routes'
import type { NextConfig } from 'next'
// import webpack from 'next/dist/compiled/webpack/webpack-lib.js'
// import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  // swcMinify: true,
  productionBrowserSourceMaps: false,
  experimental: {
    scrollRestoration: true,
    serverSourceMaps: false,
    optimizePackageImports: ['moment', 'pdfjs-dist'],
    // optimizeCss: true
    workerThreads: false,
    cpus: 1,
  },
  compiler: {
    // removeConsole: true,
  },
  // output: 'standalone',
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, '_styles')],
    api: 'modern-compiler',
    silenceDeprecations: [
      // 'mixed-decls',
      'color-functions',
      'global-builtin',
      'import',
      'legacy-js-api',
    ],
    quietDeps: true,
    // additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`,
  },
  trailingSlash: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  rewrites: async () => rewrites,
  redirects: async () => redirects,
}

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: isProduction && process.env.ANALYZE === 'true',
//   analyzerMode: 'static',
//   openAnalyzer: false,
//   // reportFilename: './analyze/client.html',
// })

// export default withBundleAnalyzer(nextConfig)
export default nextConfig
