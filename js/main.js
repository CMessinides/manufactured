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

var Cursor = {
  el: document.getElementById('cursor'),
  x: 0,
  y: 0,
  setPace: function(vec1,vec2) {
    this.el.style.transitionDuration = (Math.floor(Math.sqrt(Math.pow(vec1, 2) + Math.pow(vec2, 2))) * 3).toString() + 'ms';
    this.el.style.transitionDelay = _getRandomInt(180, 500) + 'ms';
  },
  moveTo: function(target) {
    var minX = target.offsetLeft,
        maxX = minX + target.offsetWidth - 0.5 * this.el.offsetWidth,
        minY = target.offsetTop,
        maxY = minY + target.offsetHeight - 0.5 * this.el.offsetHeight,
        targetX = _getRandomInt(minX, maxX),
        targetY = _getRandomInt(minY, maxY),
        vec1 = Math.abs(this.x - targetX),
        vec2 = Math.abs(this.y - targetY);
    this.setPace(vec1, vec2);
    this.x = targetX;
    this.y = targetY;
    this.el.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
  }
}

// run the timer
window.setInterval(function() { timer.innerText = (new Date()).toLocaleTimeString() }, 1000);

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

var TemplateFactory = {
  templates: {
    quote: document.querySelectorAll('#reference [data-type*=quote]'),
    info: document.querySelectorAll('#reference [data-type*=info]'),
    promo: document.querySelectorAll('#reference [data-type*=promo]'),
    email: document.querySelectorAll('#reference [data-type*=email]')
  },
}

var Composer = {
  current: null,

  build: function() {

  },

  place: function() {

  },

  animate: function() {

  }
};

var Program = {
  run: function() {

  },

  logout: function() {

  },

  login: function() {

  }
};

// Utilities
function _randomSelect(array) {
  return array[Math.floor(Math.random()*array.length)];
}

function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
