import { createFrontendModule } from '@backstage/frontend-plugin-api';
import { acmeServiceNameField } from './extensions';

export const scaffolderCustomizations = createFrontendModule({
  pluginId: 'scaffolder',
  extensions: [acmeServiceNameField],
});
