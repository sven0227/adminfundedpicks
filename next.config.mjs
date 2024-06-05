/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH,
  output: "standalone",
  // TODO: below line is added to resolve twice event dispatch in the calendar reducer
  reactStrictMode: false
}

export default nextConfig
