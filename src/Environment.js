const {Trait} = require('@snakesilk/engine');

class Environment extends Trait
{
    constructor()
    {
        super();
        this.NAME = 'environment';
        this.atmosphericDensity = 1000;
        this.timeDilation = 1;
    }
    __collides(subject)
    {
        if (subject.physics) {
            subject.physics.atmosphericDensity = this.atmosphericDensity;
        }

        subject.timeStretch = this.timeDilation;
    }
}

module.exports = Environment;
