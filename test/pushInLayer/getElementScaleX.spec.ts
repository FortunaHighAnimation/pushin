import { setupJSDOM } from '../setup';
import { PushInLayer } from '../../src/pushInLayer';

describe('getElementScaleX', () => {
  let element: HTMLElement;
  let mockPushInLayer: PushInLayer;
  jest.mock('../../src/pushInLayer', () => jest.fn());

  beforeEach(() => {
    setupJSDOM(`
      <!DOCTYPE html>
          <body>
              <div class="foo">Hello World!</div>
          </body>
      </html>`);

    element = document.querySelector<HTMLElement>('.foo');
    mockPushInLayer = Object.create(PushInLayer.prototype);
    mockPushInLayer['element'] = element;
  });

  it('Should return default element scale if never altered', () => {
    const result = mockPushInLayer['getElementScaleX'](element);
    expect(result).toEqual(1);
  });

  it('Should return element scale if it was previously set', () => {
    element.style.transform = 'scale(5)';
    const result = mockPushInLayer['getElementScaleX'](element);
    expect(result).toEqual(5);
  });
});
