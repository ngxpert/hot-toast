/**
 * Minimal Express server returning assorted HTTP results for manual interceptor testing.
 * Run from repo root: npm run sample:http-test-server
 */

const express = require('express');
const cors = require('cors');

const PORT = Number(process.env.PORT) || 4000;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://localhost:4300',
      'http://127.0.0.1:4300',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-Skip-Toast'],
  }),
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'Server is up' });
});

app.get('/api/unauthorized', (_req, res) => {
  res.status(401).json({ message: 'Unauthorized (401) — interceptor often skips this' });
});

app.get('/api/forbidden', (_req, res) => {
  res.status(403).type('text').send('Forbidden (403)');
});

app.get('/api/not-found', (_req, res) => {
  res.status(404).json({ message: 'Not found (404)' });
});

app.get('/api/bad-request', (_req, res) => {
  res.status(400).send('Bad request (400) plain text body');
});

app.get('/api/conflict', (_req, res) => {
  res.status(409).json({ message: 'Conflict (409)' });
});

app.get('/api/server-error', (_req, res) => {
  res.status(500).json({ message: 'Internal server error (500)' });
});

app.get('/api/teapot', (_req, res) => {
  res.status(418).send("I'm a teapot (418)");
});

/** Abruptly closes the TCP connection (client often sees a network-style failure). */
app.get('/api/network-style', (req, _res) => {
  req.socket.destroy();
});

app.post('/api/echo', (req, res) => {
  res.json({ body: req.body });
});

app.get('/api/skip-toast-header', (req, res) => {
  if (req.get('X-Skip-Toast') === '1') {
    return res.status(422).json({ message: 'Skipped by header (422)' });
  }
  return res.status(500).json({ message: 'Forgot X-Skip-Toast: 1 header' });
});

app.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><title>hot-toast HTTP test API</title></head>
<body>
  <h1>hot-toast HTTP test server</h1>
  <p>Base URL: <code>http://localhost:${PORT}</code></p>
  <p>From the Angular app (e.g. DevTools console):</p>
  <pre>fetch('http://localhost:${PORT}/api/server-error').catch(() => {})</pre>
  <p>Or use <code>HttpClient</code> in a component pointed at this origin.</p>
  <h2>Routes</h2>
  <ul>
    <li><a href="/api/health">GET /api/health</a> — 200</li>
    <li><a href="/api/unauthorized">GET /api/unauthorized</a> — 401</li>
    <li><a href="/api/forbidden">GET /api/forbidden</a> — 403</li>
    <li><a href="/api/not-found">GET /api/not-found</a> — 404</li>
    <li><a href="/api/bad-request">GET /api/bad-request</a> — 400 text</li>
    <li><a href="/api/conflict">GET /api/conflict</a> — 409 JSON</li>
    <li><a href="/api/server-error">GET /api/server-error</a> — 500 JSON</li>
    <li><a href="/api/teapot">GET /api/teapot</a> — 418</li>
    <li><a href="/api/network-style">GET /api/network-style</a> — drops connection</li>
    <li>GET /api/skip-toast-header — send header <code>X-Skip-Toast: 1</code> for 422</li>
  </ul>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`hot-toast HTTP test server listening on http://localhost:${PORT}`);
});
