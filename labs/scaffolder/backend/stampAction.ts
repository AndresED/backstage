import { resolveSafeChildPath } from '@backstage/backend-plugin-api';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { writeFile } from 'node:fs/promises';

export function serviceStampDocument(input: {
  name: string;
  owner: string;
}): string {
  return `service: ${input.name}\nowner: ${input.owner}\nplatform: acme\n`;
}

export function createAcmeServiceStampAction() {
  return createTemplateAction({
    id: 'acme:service:stamp',
    description:
      'Writes acme.yaml in the workspace with the service name and owner from the form.',
    supportsDryRun: true,
    schema: {
      input: {
        name: z =>
          z.string({
            description: 'Service name, for example ms-inventory',
          }),
        owner: z =>
          z.string({
            description: 'Owner entity ref, for example group:default/guests',
          }),
      },
      output: {
        path: z => z.string({ description: 'Relative path of the stamp file' }),
      },
    },
    async handler(ctx) {
      const filename = 'acme.yaml';
      const target = resolveSafeChildPath(ctx.workspacePath, filename);
      await writeFile(target, serviceStampDocument(ctx.input), 'utf8');
      ctx.output('path', filename);
    },
  });
}
