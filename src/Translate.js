const {Vector3} = require('three');
const {Trait} = require('@snakesilk/engine');

class Translate extends Trait
{
    constructor()
    {
        super();
        this.NAME = 'translate';
        this.velocity = new Vector3();
    }
    __timeshift(dt)
    {
        const p = this._host.position;
        const v = this.velocity;
        p.x += v.x * dt;
        p.y += v.y * dt;
        p.z += v.z * dt;
    }
}

module.exports = Translate;
