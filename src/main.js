import { ModuleController } from './components/module-controller';
import { Composer } from './components/composer';
(new ModuleController()).start();
var composer = new Composer();
composer.start();

var glitchChars = [
  '͒',
  'Ͽ',
  'Ⱥ',
  'ħ',
  'ʭ',
  '҂',
  'Ԙ',
  '֟',
  'Ֆ',
  'ߡ',
  'ࣳ',
  'ँ',
  '੦',
  '୴',
  '௨',
  'ທ',
  '༞',
  '༷',
  '༜',
  '࿈',
  '྾',
  '࿄',
  '႔',
  'ჶ',
  'ᇓ',
  '፨',
  'ᐇ',
  'ᐶ',
  'ᑧ',
  'ᑺ',
  'ᒶ',
  'ᓓ',
  'ᔍ',
  'ᖈ',
  'ᗤ',
  'ᗺ',
  'ᚍ',
  'ᚖ',
  'ᛨ',
  'ᛊ',
  'ះ',
  '៓',
  'ᣨ',
  'ᵸ',
  'ᵹ',
  '†',
  '⁜',
  '₄',
  '₀',
  '℧',
  '⅃',
  '∅',
  '∜',
  '≅',
  '⊙',
  '⋊',
  '⍇',
  '⎔',
  '⏆',
  '⑧',
  '░',
  '▨',
  '▄',
  '▓',
  '▀',
  '▪',
  '▔',
  '▰',
  '◕',
  '✪',
  '❚',
  '⟇',
  '⧨',
  '⨌',
  '⨶',
  '⫷',
  '⮹',
  'ⵖ'
];

function Item(el) {
  this.type = el.getAttribute('data-type');
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

function Composition(item, template) {
  this.item = item;
  this.el = item.compose(template);
  this.place = function() {
    workbench.appendChild(this.el);
  };
  this.
  this.remove = function() {
    workbench.removeChild(this.el);
  }
}

Composition.prototype.animate = function () {
  var steps = this.el.querySelectorAll('.Template-block');
};

function getItemFromBelt() {
  var itemOnDeck = items.firstElementChild;
  console.log(itemOnDeck);
  var offset = itemOnDeck.offsetHeight;
  console.log(offset);
  // animate the belt to hide the first item
  items.style.transform = 'translateY(-' + offset + 'px)';
  // wait for the transition, then remove and replace the item
  items.addEventListener('transitionend', rotateBeltItem, {once: true});
  // return the item
  return itemOnDeck;
}

// `this` refers to `var items`

function insertTemplate(archetype) {
  var current = document.getElementById('templateInstance');

  var instance = archetype.cloneNode(true);
  instance.id = 'templateInstance';

  // remove the current insert if it exists
  if (current) {
    workbench.removeChild(current);
  }

  workbench.appendChild(instance);
}

var Program = {
  run: function() {

  },

  logout: function() {

  },

  login: function() {

  }
};
