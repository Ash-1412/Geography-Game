const {expect} = require('chai');
const validateRegistration = require('../src/validateRegistration');

describe('Registration validation', () => {
  it('rejects a missing password', () => {
    expect(validateRegistration({username: 'student'})).to.equal(false);
  });

  it('rejects a password shorter than 8 characters', () => {
    expect(
      validateRegistration({username: 'student', password: 'short'})
    ).to.equal(false);
  });

  it('accepts valid input', () => {
    expect(
      validateRegistration({username: 'student', password: 'longenough1'})
    ).to.equal(true);
  });
});