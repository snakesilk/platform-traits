const {SpotLight, Vector2} = require('three');
const {Easing, Events, Trait, Tween} = require('@snakesilk/engine');

class Light extends Trait
{
    constructor() {
        super();
        this.NAME = 'light';

        this.EVENT_LAMP_CHANGE = 'lamp_change';

        this.direction = new Vector2();
        this.events = new Events();

        this.lamps = [];
    }

    __attach(host) {
        super.__attach(host);

        const {model} = this._host;
        this.lamps.forEach(lamp => {
            model.add(lamp.light);
            if (lamp.light.target) {
                model.add(lamp.light.target);
            }
        });
    }

    __detact() {
        const {model} = this._host;
        this.lamps.forEach(lamp => {
            model.remove(lamp.light);
            if (lamp.light.target) {
                model.remove(lamp.light.target);
            }
        });
    }

    __timeshift() {
        this._updateDirection();
    }

    _updateDirection() {
        const host = this._host;

        /* Ensure lights are always in Z front of host no matter rotation. */
        if (host.direction.x !== this.direction.x) {
            this.lamps.forEach(lamp => {
                lamp.setDirection(host.direction.x);
            })
            this.direction.x = host.direction.x;
        }
    }

    _updateScene() {
        const {world} = this._host;

        if (world) {
            world.scene.children.forEach(mesh => {
                if (mesh.material) {
                    mesh.material.needsUpdate = true;
                }
            });
        }
    }

    addLamp(light) {
        const lamp = new Lamp(light);
        this.lamps.push(lamp);
        return lamp;
    }

    on() {
        this._updateScene();
        this.lamps.forEach(lamp => lamp.start(this._host));
    }

    off() {
        this.lamps.forEach(lamp => lamp.stop(this._host));
    }
}

class Lamp
{
    constructor(light = new SpotLight(0xffffff, 0, 100)) {
        this.light = light;

        this.easeOn = Easing.easeOutElastic();
        this.easeOff = Easing.easeOutQuint();

        this.coolDownTime = 1;
        this.heatUpTime = .8;
        this.intensity = this.light.intensity;

        this.light.intensity = 0;
        this.state = false;
    }

    start(host) {
        if (this.state === true) {
            return;
        }

        this.state = true;
        const tween = new Tween({intensity: this.intensity}, this.easeOn);
        tween.addSubject(this.light);
        host.doFor(this.heatUpTime, (elapsed, progress) => {
            tween.update(progress);
        });
    }

    stop(host) {
        if (this.state === false) {
            return;
        }

        this.state = false;
        const tween = new Tween({intensity: 0}, this.easeOff);
        tween.addSubject(this.light);
        host.doFor(this.coolDownTime, (elapsed, progress) => {
            tween.update(progress);
        });
    }

    setDirection(x) {
        const dist = Math.abs(this.light.position.z);
        this.light.position.z = x > 0 ? dist : -dist;
    }
}

Light.Lamp = Lamp;

module.exports = Light;
