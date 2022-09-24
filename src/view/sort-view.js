import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { } from '../utils/point.js';

const createSortTemplate = () => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            <div class="trip-sort__item  trip-sort__item--${SortType.DAY}">
              <input id="sort-${SortType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.DAY}" checked="">
              <label class="trip-sort__btn" for="sort-${SortType.DAY}">${SortType.DAY}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.EVENT}">
              <input id="sort-${SortType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.EVENT}" disabled="">
              <label class="trip-sort__btn" for="sort-${SortType.EVENT}">${SortType.EVENT}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.TIME}">
              <input id="sort-${SortType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.TIME}" disabled="">
              <label class="trip-sort__btn" for="sort-${SortType.TIME}">${SortType.TIME}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.PRISE}">
              <input id="sort-${SortType.PRISE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.PRISE}">
              <label class="trip-sort__btn" for="sort-${SortType.PRISE}">${SortType.PRISE}</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--${SortType.OFFERS}">
              <input id="sort-${SortType.OFFERS}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortType.OFFERS}" disabled="">
              <label class="trip-sort__btn" for="sort-${SortType.OFFERS}">${SortType.OFFERS}</label>
            </div>
          </form>`;

export default class SortView extends AbstractView {

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    const isEnableTarget = (evt.target.tagName === 'LABEL' &&
    (evt.target.textContent === SortType.DAY ||
    evt.target.textContent === SortType.PRISE));

    if (!isEnableTarget) {return;}

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.textContent);
  };
}
