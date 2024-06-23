export default class DoubleSlider {
  constructor({
    min,
    max,
    formatValue = value => value,
    selected
  } = {}) {
    this.min = min ?? 0;
    this.max = max ?? 1_000;
    this.formatValue = formatValue;
    this.selected = selected ?? { from: this.min, to: this.max };
    this.element = this.createElement(this.createTemplate());
    this.subElements = {};
    this.range = this.max - this.min;
    this.leftThumb = this.element.querySelector('.range-slider__thumb-left');
    this.rightThumb = this.element.querySelector('.range-slider__thumb-right');
    this.sliderProgress = this.element.querySelector('.range-slider__progress');
    this.activeThumb = {};

    this.getSubElements();
    this.createEventListeners();
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return (`
      <div class="range-slider">
        <span data-element="from">${this.formatValue(this.selected.from)}</span>
        <div class="range-slider__inner">
          <span class="range-slider__progress" style="left: ${this.leftPosition()}%; right: ${this.rightPosition()}%"></span>
          <span class="range-slider__thumb-left" style="left: ${this.leftPosition()}%"></span>
          <span class="range-slider__thumb-right" style="right: ${this.rightPosition()}%"></span>
        </div>
        <span data-element="to">${this.formatValue(this.selected.to)}</span>
      </div>
    `);
  }

  getSubElements() {
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      this.subElements[element.dataset.element] = element;
    }
  }

  leftPosition() {
    return Math.round((this.selected.from - this.min) / this.range * 100);
  }

  rightPosition() {
    return Math.round((this.max - this.selected.to) / this.range * 100);
  }

  createEventListeners() {
    this.leftThumb.addEventListener('pointerdown', this.handlePointerDown);
    this.rightThumb.addEventListener('pointerdown', this.handlePointerDown);
  }

  handlePointerDown = (event) => {
    this.activeThumb = event.target;
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerup', this.handlePointerUp);
  }

  processPointerMove = (event) => {
    const sliderInner = this.element.querySelector('.range-slider__inner');
    const { left, width } = sliderInner.getBoundingClientRect();

    const leftPosition = left;
    const rightPosition = left + width;
    const normalizedPointerPosition = Math.min(rightPosition, Math.max(leftPosition, event.clientX));
    const percentPointerPosition = Math.round((normalizedPointerPosition - leftPosition)
      / (rightPosition - leftPosition) * 100);

    return this.min + this.range * percentPointerPosition / 100;
  }

  handlePointerMove = (event) => {
    if (this.activeThumb === this.leftThumb) {
      this.selected.from = Math.min(this.selected.to, this.processPointerMove(event));
      this.subElements.from.textContent = this.formatValue(this.selected.from);
      this.leftThumb.style.left = this.leftPosition() + '%';
      this.sliderProgress.style.left = this.leftPosition() + '%';
    }
    if (this.activeThumb === this.rightThumb) {
      this.selected.to = Math.max(this.selected.from, this.processPointerMove(event));
      this.subElements.to.textContent = this.formatValue(this.selected.to);
      this.rightThumb.style.right = this.rightPosition() + '%';
      this.sliderProgress.style.right = this.rightPosition() + '%';
    }
  }

  dispatchCustomEvent = () => {
    const event = new CustomEvent('range-select', {
      detail: {
        from: this.selected.from,
        to: this.selected.to
      }
    });
    this.element.dispatchEvent(event);
  }

  handlePointerUp = () => {
    this.activeThumb = null;
    this.dispatchCustomEvent();
    document.removeEventListener('pointermove', this.handlePointerMove);
    document.removeEventListener('pointerup', this.handlePointerUp);
  }

  removeEventListeners() {
    this.leftThumb.removeEventListener('pointerdown', this.handlePointerDown);
    this.rightThumb.removeEventListener('pointerdown', this.handlePointerDown);
  }


  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.removeEventListeners();
  }
}
