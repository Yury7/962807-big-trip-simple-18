import { BLANK_POINT, BASE_PRICE_REGULAR } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {capitalizeWord, toKebabCase, getInputTypeDate, getISOTypeDate} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const createPointEditTemplate = (data) => {
  const {id, basePrice, dateFrom, dateTo, destinationItem, destinationsNames, type, offers, offerItems, offersTypes, isDisabled, isSaving, isDeleting} = data;

  const checkFormData = () => (dateFrom !== '') &&
  (dateTo !== '') &&
  destinationItem?.name &&
  BASE_PRICE_REGULAR.test(basePrice);

  const getResetButtonName = () => {
    if (!data.id) {
      return 'Cancel';
    }
    if (isDeleting) {
      return 'Deleting...';
    }
    return 'Delete';
  };

  const createPointTypeList = () => {

    const createPointTypeItem = (typeItem, currentType) => `
  <div class="event__type-item">
    <input id="event-type-${typeItem}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${capitalizeWord(typeItem)}" ${typeItem === currentType ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__type-label  event__type-label--${typeItem}" for="event-type-${typeItem}-${id}">${capitalizeWord(typeItem)}</label>
  </div>`;

    return offersTypes
      .slice()
      .map((item) => createPointTypeItem(item, type))
      .join(' ');

  };

  const createPointDestinationsList = () => destinationsNames
    .slice()
    .map((destinationName) => `<option value="${destinationName}"></option>`)
    .join(' ');

  const createOffers = () => {
    if (!offerItems.length) {
      return '';
    }
    const createOffer = (offer) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${toKebabCase(offer.title)}-${offer.id}" type="checkbox" name="event-offer-${toKebabCase(offer.title)}" data-offer-id="${offer.id}" ${offers.includes(offer.id) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${toKebabCase(offer.title)}-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
    return `<section class="event__section  event__section--offers">
<h3 class="event__section-title  event__section-title--offers">Offers</h3>
<div class="event__available-offers">

  ${offerItems.slice().map((offer) => createOffer(offer)).join(' ')}

</div>
</section>
`;};


  const createDestination = () => {
    if (!destinationItem) {
      return '';
    }

    const createPicturesList = () => destinationItem.pictures
      .slice()
      .map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)
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
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

        <div class="event__type-list">
          <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
            <legend class="visually-hidden">Event type</legend>
            ${createPointTypeList()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type ? he.encode(capitalizeWord(type)) : ''}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem ? he.encode(destinationItem.name) : ''}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1">
            ${createPointDestinationsList()}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getInputTypeDate(dateFrom, 'set start time')}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getInputTypeDate(dateTo, 'set end time')}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${checkFormData() && !isDisabled ? '' : 'disabled'}>${isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset">${getResetButtonName()}</button>
      ${(data.id) ?
    `<button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
      <span class="visually-hidden">Open event</span>
      </button>`
    : ''}
    </header>
    <section class="event__details">
    ${createOffers()}
    ${createDestination()}
    </section>
  </form>
</li>`;
};

export default class PointEditView extends AbstractStatefulView {
  #element = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #destinationsNames = null;
  #destinations = null;
  #offersByType = null;
  #offersTypes = null;

  constructor(point = BLANK_POINT, destinationsModel, offersModel) {
    super();
    this.#destinations = destinationsModel.destinations;
    this.#destinationsNames = destinationsModel.destinationsNames;
    this.#offersByType = offersModel.offers;
    this.#offersTypes = offersModel.offersTypes;
    this._state = this.#parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitFormHandler(this._callback.submitEditForm);
    this.setDeleteItemHandler(this._callback.deleteItem);
    if (!this._state.id) {
      return;
    }
    this.setCloseFormHandler(this._callback.closeEditForm);
  };

  reset = (point) => {
    this.updateElement(
      this.#parsePointToState(point)
    );
  };

  removeElement = () => {
    this.#datepickerFrom?.destroy();
    this.#datepickerTo?.destroy();
    this.#datepickerFrom = null;
    this.#datepickerTo = null;
    super.removeElement();
  };

  setCloseFormHandler = (callback) => {
    this._callback.closeEditForm = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeEditFormHandler);
  };

  setSubmitFormHandler = (callback) => {
    this._callback.submitEditForm = callback;
    this.element.firstElementChild.addEventListener('submit', this.#submitEditFormHandler);
  };

  setDeleteItemHandler = (callback) => {
    this._callback.deleteItem = callback;
    this.element.firstElementChild.addEventListener('reset', this.#deleteItemHandler);
  };

  #parsePointToState = (point) => ({...point,
    destinationItem: this.#getDestinationItem(point.destination),
    destinationsNames: this.#destinationsNames,
    offerItems: this.#getOfferItems(point.type),
    offersTypes: this.#offersTypes,
  });

  #parseStateToPoint = (state) => {
    const point = {...state};
    delete point.destinationItem;
    delete point.destinationsNames;
    delete point.offerItems;
    delete point.offersTypes;
    return point;
  };

  #getDestinationItem = (destination) => {
    if (!destination) {
      return '';
    }
    return this.#destinations.find((item) => item.id === destination);
  };

  #getOfferItems = (type) => {
    if (!type) {
      return [];
    }
    return this.#offersByType.find((item) => item.type === type)?.offers ?? [];
  };

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr (
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        maxDate: this._state.dateTo,
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromInputHandler
      }
    );
  };

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr (
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        enableTime: true,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToInputHandler
      }
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationInputHandler);
    this.element.querySelector('#event-start-time-1').addEventListener('input', this.#dateFromInputHandler);
    this.element.querySelector('#event-end-time-1').addEventListener('input', this.#dateToInputHandler);
    this.element.querySelector('#event-price-1').addEventListener('change', this.#priceInputHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersToggleHandler);
    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  };

  #closeEditFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeEditForm();
  };

  #submitEditFormHandler = (evt) => {
    evt.preventDefault();
    this._callback.submitEditForm(this.#parseStateToPoint(this._state));
  };

  #deleteItemHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteItem(this._state);
  };

  #dateFromInputHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: getISOTypeDate(userDate),
    });
  };

  #dateToInputHandler = ([userDate]) => {
    this.updateElement({
      dateTo: getISOTypeDate(userDate),
    });
  };

  #typeToggleHandler = (evt) => {
    const currentType = evt.target.value.toLowerCase();
    this.updateElement({
      type: currentType,
      offers: [],
      offerItems: this.#getOfferItems(currentType)

    });
  };

  #destinationInputHandler = (evt) => {
    const currentDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    this.updateElement({
      destination: currentDestination?.id ?? '',
      destinationItem: this.#getDestinationItem(currentDestination?.id) ?? ''
    });
  };

  #priceInputHandler = (evt) => {
    const basePrice = parseInt(evt.target.value, 10);
    this.updateElement({
      basePrice: isNaN(basePrice) ? '' : basePrice,
    });

  };

  #offersToggleHandler = () => {
    const checkedOffers = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const checkedOfferIds = [];
    checkedOffers.forEach((checkedOffer) => checkedOfferIds.push(+checkedOffer.dataset.offerId));
    this._setState({
      offers: checkedOfferIds
    });
  };
}
