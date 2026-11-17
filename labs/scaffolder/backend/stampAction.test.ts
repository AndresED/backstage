import { serviceStampDocument } from './stampAction';

describe('serviceStampDocument', () => {
  it('should include the service name and owner when both are set', () => {
    const doc = serviceStampDocument({
      name: 'ms-inventory',
      owner: 'group:default/guests',
    });

    expect(doc).toContain('service: ms-inventory');
    expect(doc).toContain('owner: group:default/guests');
    expect(doc).toContain('platform: acme');
  });
});
