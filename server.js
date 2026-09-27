// Zero-dependency static server for local dev. Mirrors GitHub Pages: serves the repo root.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'coordinate');
const TYPES = { '.json': 'application/json', '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.csv': 'text/csv' };

function send(res, status, body, type = 'text/plain') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function serveFile(res, root, rel) {
  const file = path.join(root, rel);
  if (!file.startsWith(root)) return send(res, 403, 'Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    send(res, 200, data, TYPES[path.extname(file)] || 'application/octet-stream');
  });
}

http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  
  serveFile(res, __dirname, url === '/' ? 'index.html' : url);
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
