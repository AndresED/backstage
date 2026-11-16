import { createFrontendPlugin, PageBlueprint } from '@backstage/frontend-plugin-api';

const serviceHealthPage = PageBlueprint.make({
  params: {
    path: '/service-health',
    loader: () =>
      import('./ServiceHealthPage').then(m => <m.ServiceHealthPage />),
  },
});

export default createFrontendPlugin({
  pluginId: 'service-health',
  extensions: [serviceHealthPage],
});
