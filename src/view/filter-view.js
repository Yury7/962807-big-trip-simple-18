import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilter, filterStatus) => `<div class="trip-filters__filter">
          <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" type="trip-filter" value="${filter}" ${filter === currentFilter ? 'checked' : '' } ${filterStatus[filter] ? '' : 'disabled'}>
          <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
          </div>`;

const createFilterTemplate = (filters, currentFilter, filterStatus) => {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter, filterStatus))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #currentFilter = null;
  #filterStatus = null;
  #filters = null;

  constructor(filters, currentFilter, filterStatus) {
    super();
    this.#currentFilter = currentFilter;
    this.#filterStatus = filterStatus;
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#filterStatus);
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
