import {
  DESTINATIONS, POINT_TYPES
} from '../const.js';
import { destinations } from '../mock/destination.js';
import AbstractView from '../framework/view/abstract-view.js';
import {getRandomInteger} from '../utils/common.js';
import {capitalizeWord, getInputTypeDate} from '../utils/point.js';

const createPointEditTemplate = (point = {}) => {

  const {
    id = '',
    basePrice = '',
    dateFrom = '',
    dateTo = '',
    type = '',
    offers = '',
  } = point;

  const destination = destinations.find((item) => id === item.id)?.name ?? 'Geneva';
  const destinationItem = destinations.find((item) => id === item.id);

  const createPointTypeList = () => {

    const createPointTypeItem = (typeItem, currentType) => `
  <div class="event__type-item">
    <input id="event-type-${typeItem}-${id + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${capitalizeWord(typeItem)}" ${typeItem === currentType ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-${id + 1}">${capitalizeWord(typeItem)}</label>
  </div>`;

    return POINT_TYPES
      .slice()
      .map((item) => createPointTypeItem(item, type))
      .join(' ');

  };

  const createPointDestinationsList = () => DESTINATIONS
    .slice()
    .map((item) => `<option value="${item}"></option>`)
    .join(' ');

  const createOffers = () => {
    if (!offers) {return '';}

    const createOffer = (offer) => `
  <div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offer.id + 1}" type="checkbox" name="event-offer-luggage" ${getRandomInteger(0, 1) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-luggage-${offer.id + 1}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.prise}</span>
  </label>
</div>
  `;


    return `
<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>

<div class="event__available-offers">
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
    <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title">Add luggage</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">30</span>
    </label>
  </div>

  ${offers.slice().map((offer) => createOffer(offer)).join(' ')}
</div>
</section>
`;
  };


  const createDestination = () => {
    if (!destinationItem) {return '';}

    const createPicturesList = () => destinationItem.pictures
      .slice()
      .map((photo) => `<img class="event__photo" src="../../${photo.src}" alt="${photo.description}">`)
      .join(' ');

    const createPictures = () => destinationItem.pictures ?
      `<div class="event__photos-container">
  <div class="event__photos-tape">
    ${createPicturesList()}
  </div>
</div>
</section>` : '';


    return `
<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destinationItem.description}</p>
${createPictures()}
`;
  };


  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createPointTypeList()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeWord(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
            ${createPointDestinationsList()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getInputTypeDate(dateFrom)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getInputTypeDate(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
    </header>
    <section class="event__details">
    ${createOffers()}
${createDestination()}
    </section>
  </form>
</li>`;
};

export default class PointEditView extends AbstractView {
  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createPointEditTemplate(this.#point);
  }

  setCloseFormHandler = (callback) => {
    this._callback.closeEditForm = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeEditFormHandler);
  };

  setSaveFormHandler = (callback) => {
    this._callback.saveEditForm = callback;
    this.element.addEventListener('submit', this.#saveEditFormHandler);
  };

  #closeEditFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEditForm();
  };

  #saveEditFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveEditForm();
  };

}
