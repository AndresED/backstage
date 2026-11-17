import { createBackendModule } from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createAcmeServiceStampAction } from './stampAction';

const acmeScaffolderModule = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'acme-service-stamp',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
      },
      async init({ scaffolder }) {
        scaffolder.addActions(createAcmeServiceStampAction());
      },
    });
  },
});

export default acmeScaffolderModule;
