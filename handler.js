const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

app.get('/hello', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports.handler = serverless(app);

// localdev
if (require.main === module) {
  const defaultPort = 4000;
  const port = parseInt(process.env.PORT || defaultPort, 10);
  const host = process.env.HOST || '0.0.0.0';

  (async () => {
    const server = app.listen(
      {
        port,
        host,
      },
      () => {
        const { address, port } = server.address();

        console.log(`Server started at http://${address}:${port}`);
      },
    );
  })();
}
