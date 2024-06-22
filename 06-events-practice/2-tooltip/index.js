class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
  }
  initialize () {
    this.createEventListeners();
  }

  createEventListeners() {
    document.addEventListener('pointerover', this.handlePointerOverEvent);
    document.addEventListener('pointerout', this.handlePointerOutEvent);
    document.addEventListener('pointermove', this.handlePointerMoveEvent);
  }

  removeEventListeners() {
    document.removeEventListener('pointerover', this.handlePointerOverEvent);
    document.removeEventListener('pointerout', this.handlePointerOutEvent);
    document.removeEventListener('pointermove', this.handlePointerMoveEvent);
  }

  handlePointerOverEvent = (e) => {
    if (this.isTooltip(e.target)) {
      this.render(e.target.dataset.tooltip);
    }
  }

  handlePointerOutEvent = (e) => {
    if (this.isTooltip(e.target) && this.element) {
      this.remove();
    }
  }

  handlePointerMoveEvent = (e) => {
    if (this.element && this.isTooltip(e.target)) {
      this.element.style.left = `${e.clientX}px`;
      this.element.style.top = `${e.clientY}px`;
    }
  }

  isTooltip(target) {
    return !!target.dataset.tooltip;
  }

  render(text) {
    this.element.innerHTML = text;
    document.body.append(this.element);
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

export default Tooltip;
