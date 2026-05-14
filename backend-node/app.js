const http = require('http');

const port = process.env.PORT || 3001;

const requestHandler = (req, res) => {
    // Enable CORS for all requests
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-GitHub-Delivery, X-GitHub-Event, X-GitHub-Hook-ID');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Read the request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(`\n📥 Webhook Received!`);
        console.log(`Method: ${req.method}`);
        console.log(`URL: ${req.url}`);
        console.log(`Event: ${req.headers['x-github-event'] || 'unknown'}`);
        console.log(`Body:`, body ? JSON.parse(body) : 'No body');

        // Always respond with 200 OK for GitHub
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Webhook received successfully');
    });
};

// Create server
const server = http.createServer(requestHandler);

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
        process.exit(1);
    } else {
        console.error('Server error:', err);
    }
});

server.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
    console.log(`Waiting for GitHub webhooks...`);
});