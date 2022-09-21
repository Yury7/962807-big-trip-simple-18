import AbstractView from '../framework/view/abstract-view.js';

// const createFilterTemplate = () => `<form class="trip-filters" action="#" method="get">
//                 <div class="trip-filters__filter">
//                   <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
//                   <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
//                 </div>

//                 <div class="trip-filters__filter">
//                   <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
//                   <label class="trip-filters__filter-label" for="filter-future">Future</label>
//                 </div>

//                 <div class="trip-filters__filter">
//                   <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
//                   <label class="trip-filters__filter-label" for="filter-past">Past</label>
//                 </div>

//                 <button class="visually-hidden" type="submit">Accept filter</button>
//               </form>`;


const createFilterItemTemplate = (filter, isChecked) => `<div class="trip-filters__filter">
          <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${isChecked ? 'checked' : ''}>
          <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
          </div>`;

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
