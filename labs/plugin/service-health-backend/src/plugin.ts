import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';

export const serviceHealthPlugin = createBackendPlugin({
  pluginId: 'service-health',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ logger, httpRouter, config }) {
        const baseUrl =
          config.getOptionalString('acme.healthApi.baseUrl') ??
          'http://127.0.0.1:4010';
        logger.info(`service-health reads ${baseUrl}`);
        httpRouter.use(await createRouter({ logger, baseUrl }));
      },
    });
  },
});
