const {Trait} = require('@snakesilk/engine');
const Health = require('./Health');

class DeathSpawn extends Trait
{
    constructor()
    {
        super();
        this.NAME = 'deathSpawn';
        this.__requires(Health);

        this.chance = 1;
        this.pool = [];

        const handleSpawn = () => {
            if (this._enabled) {
                this.spawn();
            }
        };

        this.events.bind(this.EVENT_ATTACHED, host => {
            host.events.bind(host.health.EVENT_DEATH, handleSpawn);
        });

        this.events.bind(this.EVENT_DETACHED, host => {
            host.events.unbind(host.health.EVENT_DEATH, handleSpawn);
        });
    }
    getRandom()
    {
        if (!this.pool.length) {
            return null;
        }

        const rand = Math.random();
        if (rand > this.chance) {
            return null;
        }

        const index = this.pool.length * Math.random() | 0;
        return new this.pool[index]();
    }
    spawn()
    {
        const spawn = this.getRandom();
        if (spawn) {
            const host = this._host;
            spawn.position.copy(host.position);
            host.world.addObject(spawn);
        }
    }
}

module.exports = DeathSpawn;
