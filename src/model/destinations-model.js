
import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #destinationsNames = null;
  #destinationsApiService = null;

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get destinationsNames() {
    return this.#destinationsNames;
  }

  init = async () => {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    if (this.#destinations.length) {
      this.#getDestinationsNames();
    }

    this._notify(UpdateType.INIT, 'destinations');
  };

  #getDestinationsNames = () => {
    const destinations = new Set();
    this.#destinations.forEach((destination) => destinations.add(destination.name));
    this.#destinationsNames = Array.from(destinations).sort();
  };
}
