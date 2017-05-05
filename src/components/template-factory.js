import {_randomSelect} from '../util';

function TemplateFactory() {
  var templates = {
    politics: document.querySelectorAll('#reference [data-type*=politics]'),
    info: document.querySelectorAll('#reference [data-type*=info]'),
    promo: document.querySelectorAll('#reference [data-type*=promo]'),
    email: document.querySelectorAll('#reference [data-type*=email]'),
    event: document.querySelectorAll('#reference [data-type*=event]')
  };
}
