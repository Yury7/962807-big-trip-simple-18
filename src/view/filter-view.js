import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilter) => `<div class="trip-filters__filter">
          <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" type="trip-filter" value="${filter}" ${filter === currentFilter ? 'checked' : ''}>
          <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;

const createFilterTemplate = (filters, currentFilter) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };

}
