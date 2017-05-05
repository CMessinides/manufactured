import {_getRandomInt} from '../util';

function Cursor(id, context) {
  var el = document.getElementById('cursor');
  this.x = 0;
  this.y = 0;

  function setPace(vec1,vec2) {
    el.style.transitionDuration = (Math.floor(Math.sqrt(Math.pow(vec1, 2) + Math.pow(vec2, 2))) * 3).toString() + 'ms';
    el.style.transitionDelay = _getRandomInt(180, 500) + 'ms';
  };

  this.moveTo = function(target) {
    var minX = target.offsetLeft,
        maxX = minX + target.offsetWidth - 0.5 * el.offsetWidth,
        minY = target.offsetTop,
        maxY = minY + target.offsetHeight - 0.5 * el.offsetHeight,
        targetX = _getRandomInt(minX, maxX),
        targetY = _getRandomInt(minY, maxY),
        vec1 = Math.abs(this.x - targetX),
        vec2 = Math.abs(this.y - targetY);
    setPace(vec1, vec2);
    this.x = targetX;
    this.y = targetY;
    el.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
  };

  this.click = function(target, callback, args) {
    function clickAction() {
      callback.apply(context, args);
    };
    this.moveTo(target);
    el.addEventListener('transitionend', clickAction, {once: true});
  }
}

export { Cursor };
