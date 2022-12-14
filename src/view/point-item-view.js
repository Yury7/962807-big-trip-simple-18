import AbstractView from '../framework/view/abstract-view.js';
import { createElement } from '../framework/render.js';
import {
  getDate, getDateTimeType, getHours,
  getHumanizedDate,
} from '../utils/point.js';
import he from 'he';

const createPointItemTemplate = (point, destinations, offersByType) => {
  const {basePrice, dateFrom, dateTo, type, offers, destination, isFavorite} = point;

  const destinationName = (destination) ?
    destinations.find((item) => item.id === destination)?.name ?? '' : '';

  const getCheckedOffers = () => {
    if (offers.length === 0) {
      return '';
    }
    const offersByCurrentType = offersByType.find((item) => type === item.type).offers;
    return offers.slice().map((item) => offersByCurrentType[item - 1]);
  };

  const createOffer = (offer) =>
    `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
      </li>`;
  const createOfferList = (checkedOffers = getCheckedOffers()) => (checkedOffers) ?
    checkedOffers.slice().map((offer) => createOffer(offer)).join(' ') :
    `<li class="event__offer">
  <span class="event__offer-title">No additional offers</span>
  </li>`;

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${getDate(dateFrom)}">${getHumanizedDate(dateFrom)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${he.encode(type)} ${he.encode(destinationName)}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${getDateTimeType(dateFrom)}">${getHours(dateFrom)}</time>
                    —
                    <time class="event__end-time" datetime="${getDateTimeType(dateTo)}">${getHours(dateTo)}</time>
                  </p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOfferList()}
                </ul>
                <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class PointItemView extends AbstractView {
  #destinations = null;
  #element = null;
  #offersByType = null;
  #point = null;


  constructor(point, destinations, offersByType) {
    super();
    this.#destinations = destinations;
    this.#offersByType = offersByType;
    this.#point = point;
  }

  get template() {
    return createPointItemTemplate(this.#point, this.#destinations, this.#offersByType);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);

      this.#element
        .querySelector('.event__favorite-btn')
        .addEventListener('click', this.#favoriteClickHandler);
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#editClickHandler);
    }

    return this.#element;
  }


  setEditHandler = (callback) => {
    this._callback.editClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick({...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
