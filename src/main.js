import { ModuleController } from './components/module-controller';
import { Composer } from './components/composer';
(new ModuleController()).start();
var composer = new Composer();
var items = document.getElementById('items');
var workbench = document.getElementById('workbench');
var reference = document.getElementById('reference');
var timer = document.getElementById('timer');


var imgLookup = {
  square: [
    {
      id: 'Sun',
      origin: '92 8'
    },
    {
      id: 'Valley',
      origin: '144 8'
    },
    {
      id: 'Mismatch',
      origin: '8 60'
    },
    {
      id: 'Fall',
      origin: '144 60'
    },
    {
      id: 'Trap',
      origin: '8 112'
    },
    {
      id: 'Signal',
      origin: '60 112'
    }
  ],
  wide: [
    {
      id:'Cascade',
      origin: '8 8'
    },
    {
      id: 'Battery',
      origin: '60 60'
    },
    {
      id: 'Process',
      origin: '112 112'
    }
  ]
};

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
function rotateBeltItem() {
  var item = this.firstElementChild;
  this.classList.add('is-rotating');
  this.removeChild(item);
  this.style.transform = 'translateY(0)';
  this.appendChild(item);
  this.classList.remove('is-rotating')
}

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

function insertImages(el) {
  var imgContainers = {
    square: el.getElementsByClassName('i-square'),
    wide: el.getElementsByClassName('i-wide')
  };

  for (var type in imgContainers) {
    for (var i = 0; i < imgContainers[type].length; i++) {
      var container = imgContainers[type][i];
      var size = type === 'wide' ? "64 32" : "32 32";
      var src = _randomSelect(imgLookup[type]);
      var img = '<use xlink:href="/img/symbols/Symbols.svg#' + src.id + '"></use>';

      container.setAttribute('viewBox', src.origin + " " + size);
      container.innerHTML = img;
    }
  }
}

var Program = {
  run: function() {

  },

  logout: function() {

  },

  login: function() {

  }
};
