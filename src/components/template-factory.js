import {_randomSelect} from '../util';

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
    square: [
      {
        id: 'Sun',
        origin: '84 0'
      },
      {
        id: 'Valley',
        origin: '136 0'
      },
      {
        id: 'Mismatch',
        origin: '0 52'
      },
      {
        id: 'Fall',
        origin: '136 52'
      },
      {
        id: 'Trap',
        origin: '0 104'
      },
      {
        id: 'Signal',
        origin: '52 104'
      }
    ],
    wide: [
      {
        id:'Cascade',
        origin: '0 0'
      },
      {
        id: 'Battery',
        origin: '52 52'
      },
      {
        id: 'Process',
        origin: '104 104'
      }
    ]
  };

  this.addFilter = function(filter) {
    filters.push(filter);
  }

  this.prepare = function(type) {
    var template = _randomSelect(templates[type]).cloneNode(true);
    template.id = 'currentTemplate';
    insertImages(template);
    for (var i = 0; i < filters.length; i++) {
      template = filters[i](template);
    }
    return template;
  }

  function insertImages(template) {
    var imgContainers = {
      square: template.getElementsByClassName('i-square'),
      wide: template.getElementsByClassName('i-wide')
    };

    for (var type in imgContainers) {
      for (var i = 0; i < imgContainers[type].length; i++) {
        var container = imgContainers[type][i];
        var size = type === 'wide' ? "80 48" : "48 48";
        var src = _randomSelect(imgLookup[type]);
        var img = '<use xlink:href="/img/symbols/Symbols.svg#' + src.id + '"></use>';

        container.setAttribute('viewBox', src.origin + " " + size);
        container.innerHTML = img;
      }
    }
  }
}

export { TemplateFactory };
