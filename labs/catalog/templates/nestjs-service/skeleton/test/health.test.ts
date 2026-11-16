import assert from 'node:assert/strict';
import test from 'node:test';

test('health payload names the service', () => {
  const payload = { service: '${{ values.name }}', status: 'ok' };
  assert.equal(payload.service, '${{ values.name }}');
  assert.equal(payload.status, 'ok');
});
