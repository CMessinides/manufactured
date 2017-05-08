/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _shuffle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _getRandomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _randomSelect; });
function _shuffle(array) {
  var i = 0,
      j = 0,
      temp = null;

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function _randomSelect(array) {
  return array[Math.floor(Math.random() * array.length)];
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cursor__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__item__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__template_factory__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sanity_controller__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Composer; });






function Composer() {
  const items = document.getElementById('items'),
        workbench = document.getElementById('workbench'),
        reference = document.getElementById('reference'),
        importBtn = document.getElementById('importBtn'),
        colorBtn = document.getElementById('colorBtn'),
        exportBtn = document.getElementById('exportBtn'),
        cursor = new __WEBPACK_IMPORTED_MODULE_0__cursor__["a" /* Cursor */]('cursor', this),
        templateFactory = new __WEBPACK_IMPORTED_MODULE_2__template_factory__["a" /* TemplateFactory */]();

  // this is just a proxy for the animation cycle
  this.start = function () {
    stepThroughCycle();
  };

  // this is a
  function stepThroughCycle() {
    cursor.click(importBtn, cursor).then(function () {
      handleNextItem(items.firstElementChild);
    });
  }

  function handleNextItem(target) {
    let item = getNextItem(target);
    let template = templateFactory.prepare(item.type);
    let comp = item.compose(template);

    comp = __WEBPACK_IMPORTED_MODULE_3__sanity_controller__["a" /* SanityController */].filter(comp);
    comp.addEventListener('animationend', function () {
      revealBlocks(null, [].slice.call(comp.querySelectorAll('.Template-block')).reverse());
    }, { once: true });
    workbench.appendChild(comp);
  }

  function getNextItem(el) {
    let offset = el.offsetHeight;
    // animate the belt to hide the first item
    items.style.transform = 'translateY(-' + offset + 'px)';
    // wait for the transition, then remove and replace the item
    items.addEventListener('transitionend', rotateItems, { once: true });
    // return the item
    return new __WEBPACK_IMPORTED_MODULE_1__item__["a" /* Item */](el);
  }

  function rotateItems() {
    let i = items.firstElementChild;
    items.removeChild(i);
    items.style.transform = 'translateY(0)';
    items.appendChild(i);
  }

  function revealBlocks(currentTarget, nextTargets) {
    if (currentTarget) {
      currentTarget.classList.add('is-revealed');
    }
    if (nextTargets.length) {
      let nextTarget = nextTargets.pop();
      cursor.click(nextTarget, cursor).then(function () {
        revealBlocks(nextTarget, nextTargets);
      });
    } else {
      cursor.click(colorBtn, cursor).then(function () {
        colorItem(workbench.firstElementChild, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util__["a" /* _getRandomInt */])(1, 4));
      });
    }
  }

  function colorItem(target, remainingCount) {
    __WEBPACK_IMPORTED_MODULE_1__item__["a" /* Item */].prototype.color(target);
    remainingCount--;
    if (remainingCount) {
      cursor.click(colorBtn, cursor).then(function () {
        colorItem(target, remainingCount);
      });
    } else {
      cursor.click(exportBtn, cursor).then(function () {
        resetCycle(workbench.firstElementChild);
      });
    }
  }

  function resetCycle(target) {
    target.addEventListener('transitionend', function () {
      target.remove();
      stepThroughCycle(); // restart the whole animation process
    }, { once: true });
    target.classList.add('is-finished');
  }
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data_module_quotes__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModuleController; });



function ModuleController() {
  var clock = document.getElementById('moduleClock'),
      inspo = document.querySelector('#moduleInspo .content');

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["c" /* _shuffle */])(__WEBPACK_IMPORTED_MODULE_0__data_module_quotes__["a" /* moduleQuotes */]);
  for (let i = 0; i < __WEBPACK_IMPORTED_MODULE_0__data_module_quotes__["a" /* moduleQuotes */].length; i++) {
    let el = document.createElement('div');
    el.innerHTML = `<div class="body">${__WEBPACK_IMPORTED_MODULE_0__data_module_quotes__["a" /* moduleQuotes */][i].body}</div><div class="attribution">${__WEBPACK_IMPORTED_MODULE_0__data_module_quotes__["a" /* moduleQuotes */][i].author}</div>`;
    el.classList.add('inner');
    inspo.appendChild(el);
  }

  inspo.style.minHeight = inspo.children[0].offsetHeight + 'px';

  function updateClock() {
    clock.innerText = new Date().toLocaleTimeString();
  }

  function updateQuote() {
    inspo.style.minHeight = inspo.children[1].offsetHeight + 'px';
    let c = inspo.removeChild(inspo.children[0]);
    inspo.appendChild(c);
  }

  this.start = function () {
    window.setInterval(updateClock, 1000);
    window.setInterval(updateQuote, 5000);
  };
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cursor; });


function Cursor(id, context) {
  var el = document.getElementById(id);
  this.x = 0;
  this.y = 0;

  function setPace(vec1, vec2) {
    el.style.transitionDuration = (Math.floor(Math.sqrt(Math.pow(vec1, 2) + Math.pow(vec2, 2))) * 2).toString() + 'ms';
    el.style.transitionDelay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* _getRandomInt */])(300, 800) + 'ms';
  };

  this.moveTo = function (target) {
    var minX = target.offsetLeft,
        maxX = minX + target.offsetWidth - 15,
        minY = target.offsetTop,
        maxY = minY + target.offsetHeight - 15,
        targetX = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* _getRandomInt */])(minX, maxX),
        targetY = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* _getRandomInt */])(minY, maxY),
        vec1 = Math.abs(this.x - targetX),
        vec2 = Math.abs(this.y - targetY);
    setPace(vec1, vec2);
    this.x = targetX;
    this.y = targetY;
    el.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
  };

  this.click = function (target, cursor) {
    return new Promise(function (resolve, reject) {
      el.addEventListener('transitionend', resolve, { once: true });
      cursor.moveTo(target);
    });
  };
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });


function Item(el) {
  this.type = el.getAttribute('data-type');
  this.blocks = el.querySelectorAll('.Template-block');
  this.data = {};

  for (var i = 0; i < el.children.length; i++) {
    this.data[el.children[i].getAttribute('data-label')] = el.children[i].innerText.trim();
  }
}

Item.prototype.compose = function (template) {
  var blanks = template.querySelectorAll('[data-label]');

  for (var i = 0; i < blanks.length; i++) {
    var label = blanks[i].getAttribute('data-label');
    if (this.data[label]) {
      blanks[i].innerText = this.data[label];
    }
  }

  return template;
};

var colorClasses = new Array(10);
for (var i = 0; i < colorClasses.length; i++) {
  colorClasses[i] = 'skin-' + i;
}

Item.prototype.color = function (el) {
  let cn = el.className;
  let regex = /\s?skin-\d/;
  cn = cn.replace(regex, '');
  cn += ' ' + colorClasses[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* _getRandomInt */])(0, colorClasses.length - 1)];
  el.className = cn;
};



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SanityController; });


const SanityController = {
  sane: true,
  stamina: 5000,
  counter: 0,
  rollAgainstStamina: function () {
    let roll = Math.pow(this.counter, '3') + 2 * Math.pow(this.counter, '2') + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* _getRandomInt */])(1000, this.stamina / 2);
    if (roll > this.stamina) {
      this.sane = false;
    }
    this.decay(roll);
  },
  decay: function () {},
  filter: function (comp) {
    return comp;
  }
};



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateFactory; });


function TemplateFactory(filters) {
  filters = filters || [];
  var templates = {
    politics: document.querySelectorAll('#reference [data-type*=politics]'),
    info: document.querySelectorAll('#reference [data-type*=info]'),
    promo: document.querySelectorAll('#reference [data-type*=promo]'),
    email: document.querySelectorAll('#reference [data-type*=email]'),
    event: document.querySelectorAll('#reference [data-type*=event]'),
    quote: document.querySelectorAll('#reference [data-type*=quote]')
  };
  var imgLookup = {
    square: [{
      id: 'Sun',
      origin: '84 0'
    }, {
      id: 'Valley',
      origin: '136 0'
    }, {
      id: 'Mismatch',
      origin: '0 52'
    }, {
      id: 'Fall',
      origin: '136 52'
    }, {
      id: 'Trap',
      origin: '0 104'
    }, {
      id: 'Signal',
      origin: '52 104'
    }],
    wide: [{
      id: 'Cascade',
      origin: '0 0'
    }, {
      id: 'Battery',
      origin: '52 52'
    }, {
      id: 'Process',
      origin: '104 104'
    }]
  };

  this.addFilter = function (filter) {
    filters.push(filter);
  };

  this.prepare = function (type) {
    var template = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* _randomSelect */])(templates[type]).cloneNode(true);
    template.id = 'currentTemplate';
    insertImages(template);
    for (var i = 0; i < filters.length; i++) {
      template = filters[i](template);
    }
    return template;
  };

  function insertImages(template) {
    var imgContainers = {
      square: template.getElementsByClassName('i-square'),
      wide: template.getElementsByClassName('i-wide')
    };

    for (var type in imgContainers) {
      for (var i = 0; i < imgContainers[type].length; i++) {
        var container = imgContainers[type][i];
        var size = type === 'wide' ? "80 48" : "48 48";
        var src = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* _randomSelect */])(imgLookup[type]);
        var img = '<use xlink:href="/img/symbols/Symbols.svg#' + src.id + '"></use>';

        container.setAttribute('viewBox', src.origin + " " + size);
        container.innerHTML = img;
      }
    }
  }
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const moduleQuotes = [{
  author: "Dieter Rams",
  body: "Good design is innovative."
}, {
  author: "Dieter Rams",
  body: "Good design makes a product useful."
}, {
  author: "Dieter Rams",
  body: "Good design is aesthetic."
}, {
  author: "Dieter Rams",
  body: "Good design is unobtrusive."
}, {
  author: "Dieter Rams",
  body: "Good design is honest."
}, {
  author: "Dieter Rams",
  body: "Good design is long-lasting."
}, {
  author: "Dieter Rams",
  body: "Good design is thorough down to the last detail."
}, {
  author: "Dieter Rams",
  body: "Good design makes a product understandable."
}, {
  author: "Dieter Rams",
  body: "Good design is environmentally friendly."
}, {
  author: "Dieter Rams",
  body: "Good design is as little design as possible."
}, {
  author: "David Carson",
  body: "Graphic design will save the world right after rock and roll does."
}, {
  author: "Paula Scher",
  body: "It’s through mistakes that you actually can grow. You have to get bad in order to get good."
}, {
  author: "Neville Brody",
  body: "Digital design is like painting, except the paint never dries."
}, {
  author: "Saul Bass",
  body: "I want to make beautiful things, even if nobody cares, as opposed to ugly things. That’s my intent."
}, {
  author: "Frank Chimero",
  body: "Good design is all about making other designers feel like idiots because that idea wasn’t theirs."
}, {
  author: "Jeffrey Zeldman",
  body: "Content precedes design. Design in the absence of content is not design, it’s decoration."
}, {
  author: "Massimo Vignelli",
  body: "The life of a designer is a life of fight. Fight against the ugliness."
}, {
  author: "Massimo Vignelli",
  body: "Styles come and go. Good design is a language, not a style."
}, {
  author: "Ray Bradbury",
  body: "Those who don't build must burn."
}, {
  author: "Henry Ford",
  body: "If I had asked people what they wanted, they would have said faster horses."
}, {
  author: "Irene Etzkorn",
  body: "There is no such thing as a boring project. There are only boring executions."
}, {
  author: "Michael Bierut",
  body: "Simplicity, wit, and good typography."
}, {
  author: "M.C. Escher",
  body: "Only those who attempt the absurd will achieve the impossible."
}, {
  author: "Aristotle",
  body: "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
}, {
  author: "Miles van der Rohe",
  body: "I don’t want to be interesting. I want to be good."
}, {
  author: "Louis Sullivan",
  body: "Form ever follows function."
}, {
  author: "Stephen Gardiner",
  body: "Good buildings come from good people and all problems are solved by good design."
}, {
  author: "Zaha Hadid",
  body: "I will never give myself the luxury of thinking, 'I've made it.'"
}, {
  author: "Denise Scott Brown",
  body: "Faced with unmeasurables, people steer their way by magic."
}, {
  author: "Vera Wang",
  body: "I love the idea that something is practical and still looks great."
}, {
  author: "Vera Wang",
  body: "All I did my first year at Vogue was Xerox."
}, {
  author: "Ellen Lupton",
  body: "Typography is what language looks like."
}, {
  author: "Ellen Lupton",
  body: "Design is art people use."
}, {
  author: "Paula Scher",
  body: "The job of the designer is to make things understandable, usable, accessible, enjoyable."
}, {
  author: "Paula Scher",
  body: "Design is the art of planning, and it is the art of making things possible."
}];
/* harmony export (immutable) */ __webpack_exports__["a"] = moduleQuotes;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_module_controller__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_composer__ = __webpack_require__(1);


new __WEBPACK_IMPORTED_MODULE_0__components_module_controller__["a" /* ModuleController */]().start();
var composer = new __WEBPACK_IMPORTED_MODULE_1__components_composer__["a" /* Composer */]();
composer.start();

var glitchChars = ['͒', 'Ͽ', 'Ⱥ', 'ħ', 'ʭ', '҂', 'Ԙ', '֟', 'Ֆ', 'ߡ', 'ࣳ', 'ँ', '੦', '୴', '௨', 'ທ', '༞', '༷', '༜', '࿈', '྾', '࿄', '႔', 'ჶ', 'ᇓ', '፨', 'ᐇ', 'ᐶ', 'ᑧ', 'ᑺ', 'ᒶ', 'ᓓ', 'ᔍ', 'ᖈ', 'ᗤ', 'ᗺ', 'ᚍ', 'ᚖ', 'ᛨ', 'ᛊ', 'ះ', '៓', 'ᣨ', 'ᵸ', 'ᵹ', '†', '⁜', '₄', '₀', '℧', '⅃', '∅', '∜', '≅', '⊙', '⋊', '⍇', '⎔', '⏆', '⑧', '░', '▨', '▄', '▓', '▀', '▪', '▔', '▰', '◕', '✪', '❚', '⟇', '⧨', '⨌', '⨶', '⫷', '⮹', 'ⵖ'];

function Item(el) {
  this.type = el.getAttribute('data-type');
  this.data = {};

  for (var i = 0; i < el.children.length; i++) {
    this.data[el.children[i].getAttribute('data-label')] = el.children[i].innerText.trim();
  }
}

Item.prototype.compose = function (template) {
  var blanks = template.querySelectorAll('[data-label]');

  for (var i = 0; i < blanks.length; i++) {
    var label = blanks[i].getAttribute('data-label');
    if (this.data[label]) {
      blanks[i].innerText = this.data[label];
    }
  }

  return template;
};

function Composition(item, template) {
  this.item = item;
  this.el = item.compose(template);
  this.place = function () {
    workbench.appendChild(this.el);
  };
  this.this.remove = function () {
    workbench.removeChild(this.el);
  };
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
  items.addEventListener('transitionend', rotateBeltItem, { once: true });
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
  run: function () {},

  logout: function () {},

  login: function () {}
};

/***/ })
/******/ ]);