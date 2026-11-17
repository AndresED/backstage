import { isAcmeServiceName } from './AcmeServiceNameField';

describe('isAcmeServiceName', () => {
  it('should accept a kebab-case service name when it starts with a letter', () => {
    expect(isAcmeServiceName('ms-inventory')).toBe(true);
    expect(isAcmeServiceName('MS-Inventory')).toBe(false);
    expect(isAcmeServiceName('-inventory')).toBe(false);
    expect(isAcmeServiceName('ms--orders')).toBe(false);
  });
});
