// import { withPayload } from '@payloadcms/next/withPayload'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Your Next.js config here
//   webpack: (webpackConfig) => {
//     webpackConfig.resolve.extensionAlias = {
//       '.cjs': ['.cts', '.cjs'],
//       '.js': ['.ts', '.tsx', '.js', '.jsx'],
//       '.mjs': ['.mts', '.mjs'],
//     }

//     return webpackConfig
//   },
// }

// export default withPayload(nextConfig, { devBundleServerPackages: false })





import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ keep
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ REQUIRED for Payload + pino
  serverExternalPackages: ['payload', 'pino', 'thread-stream'],

  // ✅ REQUIRED for Next.js 16 when webpack is present
  turbopack: {},

  // ✅ keep your existing webpack config
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, {
  devBundleServerPackages: false,
})
