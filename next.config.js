module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/repositories',
        permanent: false,
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}