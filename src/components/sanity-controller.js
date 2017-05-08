import {_getRandomInt} from '../util';

const SanityController = {
  sane: true,
  stamina: 5000,
  counter: 0,
  rollAgainstStamina: function() {
    let roll = Math.pow(this.counter, '3') + 2 * Math.pow(this.counter, '2') + _getRandomInt(1000,this.stamina / 2);
    if (roll > this.stamina) {
      this.sane = false;
    }
    this.decay(roll);
  },
  decay: function() {

  },
  filter: function(comp) {
    return comp;
  }
}

export { SanityController };
