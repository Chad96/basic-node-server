const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // Set headers
  res.setHeader('Content-Type', 'application/json');

  // Routing logic
  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Welcome to the Node.js server!' }));
  } else if (req.url === '/data' && req.method === 'GET') {
    const data = {
      name: 'Node.js Server',
      version: '1.0.0',
      description: 'This is a basic Node.js server',
    };
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const receivedData = JSON.parse(body);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Data received', data: receivedData }));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
