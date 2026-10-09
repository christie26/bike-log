// Zero-dependency server: serves the repo root (like GitHub Pages) and the guestbook API.
//   GET  /api/messages  -> messages, newest first
//   POST /api/messages  {name, text} -> 201
// Messages are kept in MESSAGES_FILE (default messages.json, not in git). On Railway, point it to a volume, e.g. /data/messages.json.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const MESSAGES_FILE = process.env.MESSAGES_FILE || path.join(__dirname, 'messages.json');
const NAME_MAX = 40;
const TEXT_MAX = 500;
const BODY_MAX_BYTES = 4096;
const POST_GAP_MS = 10 * 1000; // one message per IP in this time, against spam
const SHOWN_MAX = 200; // newest messages returned by GET
const TYPES = { '.json': 'application/json', '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.csv': 'text/csv' };

function send(res, status, body, type = 'text/plain') {
  res.writeHead(status, { 'Content-Type': type });
  res.end(body);
}

function serveFile(res, root, rel) {
  const file = path.join(root, rel);
  if (!file.startsWith(root) || file.startsWith(MESSAGES_FILE)) return send(res, 403, 'Forbidden'); // messages only via the API
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    send(res, 200, data, TYPES[path.extname(file)] || 'application/octet-stream');
  });
}

// Oldest first in memory and on disk.
let messages = [];
try { messages = JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8')); } catch (e) { if (e.code !== 'ENOENT') throw e; }

// Write to a temp file then rename, so a crash never leaves a half-written file.
function saveMessages() {
  const tmp = MESSAGES_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(messages, null, 2));
  fs.renameSync(tmp, MESSAGES_FILE);
}

const lastPost = new Map(); // IP -> time of its last message
function addMessage(req, res) {
  const ip = req.headers['x-real-ip'] || req.socket.remoteAddress; // X-Real-IP: client IP set by the Railway proxy
  if (Date.now() - (lastPost.get(ip) || 0) < POST_GAP_MS) return send(res, 429, 'Too many messages');
  let body = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    body += chunk;
    if (body.length > BODY_MAX_BYTES) { send(res, 413, 'Too large'); req.destroy(); }
  });
  req.on('end', () => {
    if (res.writableEnded) return; // already refused as too large
    let input;
    try { input = JSON.parse(body); } catch { return send(res, 400, 'Bad JSON'); }
    const name = typeof input?.name === 'string' ? input.name.trim() : '';
    const text = typeof input?.text === 'string' ? input.text.trim() : '';
    if (!name || name.length > NAME_MAX || !text || text.length > TEXT_MAX) return send(res, 400, 'Bad name or text');
    messages.push({ name, text, createdAt: new Date().toISOString() });
    saveMessages();
    lastPost.set(ip, Date.now());
    send(res, 201, '');
  });
}

http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (url === '/api/messages') {
    if (req.method === 'GET') return send(res, 200, JSON.stringify(messages.slice(-SHOWN_MAX).reverse()), 'application/json');
    if (req.method === 'POST') return addMessage(req, res);
    return send(res, 405, 'Method not allowed');
  }
  serveFile(res, __dirname, url === '/' ? 'index.html' : url);
}).listen(PORT, () => console.log(`http://localhost:${PORT}`));
