const http = require('http');
const port = process.env.PORT || 3001;

const requestHandler = (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  res.end('Hello from backend-node!');
};

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
