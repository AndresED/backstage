import {
  FormFieldBlueprint,
  createFormField,
} from '@backstage/plugin-scaffolder-react/alpha';
import {
  AcmeServiceNameField,
  validateAcmeServiceName,
} from './AcmeServiceNameField';

// ponytail: no JSON schema, so this field does not preview in /create/edit.
// Upgrade path: pass schema from makeFieldSchemaFromZod(z.string()) in @backstage/plugin-scaffolder.
export const acmeServiceNameField = FormFieldBlueprint.make({
  name: 'acme-service-name',
  params: {
    field: async () =>
      createFormField({
        name: 'AcmeServiceName',
        component: AcmeServiceNameField,
        validation: validateAcmeServiceName,
      }),
  },
});
