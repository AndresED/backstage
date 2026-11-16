import { Router } from 'express';
import type { LoggerService } from '@backstage/backend-plugin-api';

type HealthResponse = {
  services: Array<{
    name: string;
    status: string;
    version: string;
    environment: string;
    lastDeployment: string;
  }>;
};

export async function createRouter(options: {
  logger: LoggerService;
  baseUrl: string;
}): Promise<Router> {
  const router = Router();

  router.get('/services', async (_req, res) => {
    try {
      const response = await fetch(`${options.baseUrl}/services`);
      if (!response.ok) {
        options.logger.warn(`health api status ${response.status}`);
        res.status(502).json({ error: 'health api unavailable' });
        return;
      }
      const body = (await response.json()) as HealthResponse;
      res.json(body);
    } catch (error) {
      options.logger.error(`health api failed: ${String(error)}`);
      res.status(502).json({ error: 'health api unavailable' });
    }
  });

  return router;
}
