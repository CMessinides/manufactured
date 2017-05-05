import {moduleQuotes as quotes} from '../data/module-quotes';
import {_shuffle} from '../util';

function ModuleController() {
  var clock = document.getElementById('moduleClock'),
      inspo = document.querySelector('#moduleInspo .content');

  _shuffle(quotes);
  for (let i = 0; i < quotes.length; i++) {
    let el = document.createElement('div');
    el.innerHTML = `<div class="body">${ quotes[i].body }</div><div class="attribution">${ quotes[i].author }</div>`;
    el.classList.add('inner');
    inspo.appendChild(el);
  }

  inspo.style.minHeight = inspo.children[0].offsetHeight + 'px';

  function updateClock() {
    clock.innerText = (new Date()).toLocaleTimeString();
  }

  function updateQuote() {
    inspo.style.minHeight = inspo.children[1].offsetHeight + 'px';
    let c = inspo.removeChild(inspo.children[0]);
    inspo.appendChild(c);
  }

  this.start = function() {
    window.setInterval(updateClock, 1000);
    window.setInterval(updateQuote, 5000);
  }
}

export { ModuleController };
