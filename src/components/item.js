import { _getRandomInt } from '../util';

function Item(el) {
  this.type = el.getAttribute('data-type');
  this.blocks = el.querySelectorAll('.Template-block');
  this.data = {};

  for (var i = 0; i < el.children.length; i++) {
    this.data[el.children[i].getAttribute('data-label')] = el.children[i].innerText.trim();
  }
}

Item.prototype.compose = function(template) {
  var blanks = template.querySelectorAll('[data-label]');

  for (var i = 0; i < blanks.length; i++) {
    var label = blanks[i].getAttribute('data-label');
    if (this.data[label]) {
      blanks[i].innerText = this.data[label];
    }
  }

  return template;
}

var colorClasses = new Array(10);
for (var i = 0; i < colorClasses.length; i++) {
  colorClasses[i] = 'skin-' + i;
}

Item.prototype.color = function(el) {
  let cn = el.className;
  let regex = /\s?skin-\d/;
  cn = cn.replace(regex, '');
  cn += ' ' + colorClasses[_getRandomInt(0,(colorClasses.length - 1))];
  el.className = cn;
}

export { Item };
