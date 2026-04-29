const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ service: 'service-c', status: 'healthy', version: '1.0.0' }));
});
server.listen(3002, () => console.log('Service C running on port 3002'));
