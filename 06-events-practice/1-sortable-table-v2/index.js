import SortableTable from "../../05-dom-document-loading/2-sortable-table-v1";

export default class SortableTable2 extends SortableTable {
  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    super(headersConfig, data);
    this.sorted = sorted;

    this.subElements = {
      ...this.subElements,
      header: this.element.querySelector('[data-element="header"]'),
    };

    this.createEventListeners();
    this.createDefaultSort();
  }

  handleColumnClick = (e) => {
    e.stopPropagation();
    const tableCellElement = e.target.closest('[data-sortable="true"]');
    if (!tableCellElement) {
      return;
    }
    const order = tableCellElement.dataset.order === 'desc' ? 'asc' : 'desc';
    tableCellElement.dataset.order = order;
    this.sort(tableCellElement.dataset.id, order);
  }

  createEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.handleColumnClick);
  }

  removeEventListeners() {
    this.subElements.header.removeEventListener('pointerdown', this.handleColumnClick);
  }

  createDefaultSort() {
    const tableCellElement = this.element.querySelector(`[data-id="${this.sorted.id}"]`);

    tableCellElement.dataset.order = this.sorted.order;
    tableCellElement.innerHTML = `
      <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
      </span>`;

    this.sort(this.sorted.id, this.sorted.order);
  }

  destroy() {
    this.removeEventListeners();
    super.destroy();
  }
}
