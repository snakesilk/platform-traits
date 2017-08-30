const expect = require('expect.js');
const sinon = require('sinon');

const Main = require('..');

describe('Main export', () => {
  [
    'Blink',
    'Health',
    'Lifetime',
    'Pickupable',
    'Rotate',
    'Solid',
    'Translate'
  ].forEach(traitName => {
    it(`exports ${traitName}`, () => {
      expect(Main[traitName]).to.be(require('../' + traitName));
    });
  });
});
