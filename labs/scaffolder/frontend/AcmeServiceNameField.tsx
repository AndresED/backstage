import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import type { FieldValidation } from '@rjsf/utils';

const SERVICE_NAME = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

export function isAcmeServiceName(value: string): boolean {
  return SERVICE_NAME.test(value);
}

export const AcmeServiceNameField = ({
  onChange,
  rawErrors,
  required,
  formData,
}: FieldExtensionComponentProps<string>) => {
  return (
    <FormControl
      margin="normal"
      required={required}
      error={(rawErrors?.length ?? 0) > 0}
    >
      <InputLabel htmlFor="acme-service-name">Service name</InputLabel>
      <Input
        id="acme-service-name"
        aria-describedby="acme-service-name-helper"
        value={formData ?? ''}
        onChange={event => onChange(event.target.value)}
      />
      <FormHelperText id="acme-service-name-helper">
        Lowercase letters, numbers and single hyphens. Example: ms-inventory
      </FormHelperText>
    </FormControl>
  );
};

export const validateAcmeServiceName = (
  value: string,
  validation: FieldValidation,
) => {
  if (!isAcmeServiceName(value ?? '')) {
    validation.addError(
      'Use a lowercase name that starts with a letter. Example: ms-inventory.',
    );
  }
};
