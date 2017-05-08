import { Cursor } from './cursor';
import { Item } from './item';
import { TemplateFactory } from './template-factory';
import { SanityController } from './sanity-controller';
import { _getRandomInt } from '../util';

function Composer() {
  const items = document.getElementById('items'),
      workbench = document.getElementById('workbench'),
      reference = document.getElementById('reference'),
      importBtn = document.getElementById('importBtn'),
      colorBtn = document.getElementById('colorBtn'),
      exportBtn = document.getElementById('exportBtn'),
      cursor = new Cursor('cursor', this),
      templateFactory = new TemplateFactory();

  // this is just a proxy for the animation cycle
  this.start = function() {
    window.setTimeout(function() { window.location.reload() }, (15 * 60 * 1000)); // reset in 15 minutes
    stepThroughCycle();
  }

  // this is a
  function stepThroughCycle() {
    cursor.click(importBtn, cursor).then(function() {
      handleNextItem(items.firstElementChild)
    });
  }

  function handleNextItem(target) {
    let item = getNextItem(target);
    let template = templateFactory.prepare(item.type);
    let comp = item.compose(template);

    comp = SanityController.filter(comp);
    let eventFn = function() {
      comp.removeEventListener('animationend', eventFn);
      revealBlocks(null, [].slice.call(comp.querySelectorAll('.Template-block')).reverse());
    }
    comp.addEventListener('animationend', eventFn);
    workbench.appendChild(comp);
  }

  function getNextItem(el) {
    let offset = el.offsetHeight;
    // animate the belt to hide the first item
    items.style.transform = 'translateY(-' + offset + 'px)';
    // wait for the transition, then remove and replace the item
    let eventFn = function() {
      items.removeEventListener('transitionend', eventFn);
      rotateItems;
    }
    items.addEventListener('transitionend', rotateItems);
    // return the item
    return new Item(el);
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
      cursor.click(nextTarget, cursor).then(function() {
        revealBlocks(nextTarget, nextTargets);
      });
    } else {
      cursor.click(colorBtn, cursor).then(function() {
        colorItem(workbench.firstElementChild, _getRandomInt(1,4));
      })
    }
  }

  function colorItem(target, remainingCount) {
    Item.prototype.color(target);
    remainingCount--;
    if (remainingCount) {
      cursor.click(colorBtn, cursor).then(function() {
        colorItem(target, remainingCount);
      });
    } else {
      cursor.click(exportBtn, cursor).then(function() {
        resetCycle(workbench.firstElementChild);
      });
    }
  }

  function resetCycle(target) {
    let eventFn = function() {
      target.removeEventListener('transitionend', eventFn);
      target.remove();
      stepThroughCycle();
    }
    target.addEventListener('transitionend', eventFn);
    target.classList.add('is-finished');
  }
}

export { Composer };
