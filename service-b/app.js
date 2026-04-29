const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ service: 'service-b', status: 'healthy', version: '1.0.0' }));
});
server.listen(3001, () => console.log('Service B running on port 3001'));
