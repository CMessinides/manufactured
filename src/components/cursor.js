import {_getRandomInt} from '../util';

function Cursor(id, context) {
  var el = document.getElementById(id);
  this.x = 0;
  this.y = 0;

  function setPace(vec1,vec2) {
    el.style.transitionDuration = (Math.floor(Math.sqrt(Math.pow(vec1, 2) + Math.pow(vec2, 2))) * 2).toString() + 'ms';
    el.style.transitionDelay = _getRandomInt(180, 500) + 'ms';
  };

  this.moveTo = function(target) {
    var minX = target.offsetLeft,
        maxX = minX + target.offsetWidth - 15,
        minY = target.offsetTop,
        maxY = minY + target.offsetHeight - 15,
        targetX = _getRandomInt(minX, maxX),
        targetY = _getRandomInt(minY, maxY),
        vec1 = Math.abs(this.x - targetX),
        vec2 = Math.abs(this.y - targetY);
    console.log(`Path to ${target}:
      minX: ${minX}
      maxX: ${maxX}
      minY: ${minY}
      maxY: ${maxY}
      targetX: ${targetX}
      targetY: ${targetY}
      vec1: ${vec1}
      vec2: ${vec2}`);
    setPace(vec1, vec2);
    this.x = targetX;
    this.y = targetY;
    el.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
  };

  this.click = function(target, callback, args) {
    el.addEventListener('transitionend', function() {
      args ? callback(target, ...args) : callback(target)
    }, {once: true});
    this.moveTo(target);
  }
}

export { Cursor };
