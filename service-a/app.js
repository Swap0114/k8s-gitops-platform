const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ service: 'service-a', status: 'healthy', version: '1.0.0' }));
});
server.listen(3000, () => console.log('Service A running on port 3000'));
