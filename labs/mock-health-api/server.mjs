import { createServer } from 'node:http';

const services = [
  {
    name: 'ms-auth',
    status: 'healthy',
    version: '1.4.2',
    environment: 'dev',
    lastDeployment: '2026-10-06T18:40:00Z',
  },
  {
    name: 'ms-orders',
    status: 'healthy',
    version: '1.2.0',
    environment: 'dev',
    lastDeployment: '2026-10-07T11:05:00Z',
  },
  {
    name: 'ms-payments',
    status: 'degraded',
    version: '1.1.0',
    environment: 'dev',
    lastDeployment: '2026-10-05T09:12:00Z',
  },
];

const port = Number(process.env.PORT ?? 4010);

const server = createServer((req, res) => {
  if (req.url !== '/services') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not found' }));
    return;
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ services }));
});

server.listen(port, '127.0.0.1', () => {
  process.stdout.write(`mock health api on http://127.0.0.1:${port}/services\n`);
});
