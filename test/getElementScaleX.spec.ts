require('chai').should();

var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

import { PushIn } from '../src/pushin';

describe('getElementScaleX', function () {
  before(function () {
    this.layerMock = {
      originalScale: 2,
      params: {
        inpoint: 10,
        speed: 2,
      },
    };
  });

  this.beforeEach(function () {
    var dom = new JSDOM(`
        <!DOCTYPE html>
            <body>
                <div class="foo">Hello World!</div>
            </body>
        </html>`);

    global.window = dom.window;
    global.document = window.document;
  });

  it('Should return default element scale if never altered', function () {
    var instance = new PushIn(null);

    var element = document.querySelector<HTMLElement>('.foo');
    var result = instance['getElementScaleX'](element);

    result.should.equal(1);
  });

  it('Should return element scale if it was previously set', function () {
    var instance = new PushIn(null);

    var element = document.querySelector<HTMLElement>('.foo');

    element.style.transform = 'scale(5)';

    var result = instance['getElementScaleX'](element);

    result.should.equal(5);
  });
});