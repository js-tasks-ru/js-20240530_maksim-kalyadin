export default class NotificationMessage {
  element;
  static parentNode;
  constructor(message = '', options = {duration: 0, type: 'success' }) {
    this.message = message;
    this.duration = options.duration;
    this.type = options.type;

    this.timerId = 0;
    this.element = this.createElement(this.createTemplate());
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;

    return element.firstChild;
  }

  createTemplate() {
    return (`<div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.type}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>`);
  }

  show(parentElement) {
    if (parentElement) {
      parentElement.append(this.element);
    }

    if (NotificationMessage.parentNode) {
      NotificationMessage.parentNode.destroy();
    }

    document.body.append(parentElement ?? this.element);


    this.timerId = setTimeout(() => {
      this.destroy();
    }, this.duration);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    NotificationMessage.parentNode = undefined;
    clearTimeout(this.timerId);
  }
}
