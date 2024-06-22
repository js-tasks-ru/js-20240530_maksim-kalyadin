export default class DoubleSlider {
  constructor({min, max, formatValue = value => '$' + value, selected } = {}) {
    this.min = min ?? 0;
    this.max = max ?? 1_000_000;
    this.formatValue = formatValue;
    this.selected = selected ?? { from: this.min, to: this.max };
    this.from = this.selected.from;
    this.to = this.selected.to;

    this.element = this.createElement(this.createTemplateElement());
    this.createEventListeners();
  }

  createEventListeners() {}

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplateElement() {
    return (`
      <div class="range-slider">
        <span data-element="from">${this.formatValue(this.from)}</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress"></span>
          <span class="range-slider__thumb-left"></span>
          <span class="range-slider__thumb-right"></span>
        </div>
        <span data-element="to">${this.formatValue(this.to)}</span>
      </div>`
    );
  }

  removeEventListeners() {
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();
  }
}
