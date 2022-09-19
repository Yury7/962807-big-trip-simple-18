import { destinations } from '../mock/destination.js';
import AbstractView from '../framework/view/abstract-view.js';
import {
  getDate, getDateTimeType,
  getDuration, getHours,
  getHumanizedDate, getRandomInteger
} from '../utils.js';

const createPointItemTemplate = (point) => {
  const {id, basePrice, dateFrom, dateTo, type, offers} = point;
  const destination = destinations.find((item) => id === item.id).name;
  const createOffer = (offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
    </li>`;

  const createOfferList = (offerList) => (offerList?.length) ?
    offerList.slice().map((offer) => createOffer(offer)).join(' ') :
    `<li class="event__offer">
  <span class="event__offer-title">No additional offers</span>
  </li>`;

  const favoriteButtonActive = getRandomInteger(0, 1) ?
    'event__favorite-btn--active' :
    '';


  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${getDate(dateTo)}">${getHumanizedDate(dateTo)}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${getDateTimeType(dateFrom)}">${getHours(dateFrom)}</time>
                    —
                    <time class="event__end-time" datetime="${getDateTimeType(dateTo)}">${getHours(dateTo)}</time>
                  </p>
                  <p class="event__duration">${getDuration(dateFrom, dateTo)}M</p>
                </div>
                <p class="event__price">
                  €&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${createOfferList(offers)}
                </ul>
                <button class="event__favorite-btn ${favoriteButtonActive}" type="button">
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

export default class EventItemView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointItemTemplate(this.#point);
  }
}
