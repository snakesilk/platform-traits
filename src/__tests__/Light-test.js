const expect = require('expect.js');
const sinon = require('sinon');

const {Entity} = require('@snakesilk/engine');
const Light = require('../Light');

describe('Light', () => {
  let light, host;

  describe('on instantiation', () => {
    beforeEach(() => {
      light = new Light();
    });

    it('has name', () => {
      expect(light.NAME).to.be('light');
    });

    describe('when applied', () => {
      beforeEach(() => {
        host = new Entity();
        host.applyTrait(light);
      });

      it('exposes trait as "light"', () => {
        expect(host.light).to.be(light);
      });
    });
  });
});
