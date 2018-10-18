const assert = require('assert');
const oct10 = require('../index.js');

describe('oct10', () => {
  it('has a test', () => {
    assert(true, 'oct10 should have a test');
  });
});

describe('add test', () => {
  it('testing the add point function', () => {
    let oct1 = new oct10.Operation(3, 2);
    assert.equal(oct1.addPoints(), 5);
    let oct2 = new oct10.Operation(-3, 0);
    assert.equal(-3, oct2.addPoints());
  });
});
