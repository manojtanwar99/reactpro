// const { createProxyMiddleware } = require('http-proxy-middleware');
// module.exports = function(app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://superheroapi.com/',
//       changeOrigin: true,
//     })
//   );
// };

const proxy = require("http-proxy-middleware");
const morgan = require("morgan");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: 'https://superheroapi.com/',
      changeOrigin: true,
      
    })
  );

  app.use(morgan('combined'));
};