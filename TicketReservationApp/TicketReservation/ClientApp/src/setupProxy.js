const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:29728';

const context =  [
  "/api/traveller",
  "api/traveller",
  "/api/backofficer",
    "api/backofficer",
    "api/booking",
    "/api/booking",
  "api/test",
  "/api/test",
  "api/user",
  "/api/user",
  "api/train",
  "/api/train",
  "api/schedule",
  "/api/schedule",
  "api/trainschedule",
  "/api/trainschedule",
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    changeOrigin:true,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
