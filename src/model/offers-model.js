
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable {
  #offers = [];
  #offersApiService = null;
  #offersTypes = null;

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  get offersTypes() {
    return this.#offersTypes;
  }

  init = async () => {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    if (this.#offers.length) {
      this.#getOffersTypes();
    }

    this._notify(UpdateType.INIT, 'offers');
  };

  #getOffersTypes = () => {
    const offersTypes = new Set();
    this.#offers.forEach((offer) => offersTypes.add(offer.type));
    this.#offersTypes = Array.from(offersTypes);
  };
}
