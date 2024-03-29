module.exports.security = {
  cors: {
    allRoutes: true,
    allowOrigins: ['http://localhost:3000'],
    allowCredentials: true,
    allowRequestHeaders: 'Content-Type, Authorization',
    allowRequestMethods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  },
};
