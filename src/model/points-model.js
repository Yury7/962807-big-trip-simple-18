import {generatePoints} from '../mock/points.js';
import { generateDestinations } from '../mock/destination.js';
import { generateOffersByType } from '../mock/offer.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #offersByType = null;
  #destinations = null;
  #points = null;

  constructor() {
    super();
    this.#offersByType = generateOffersByType();
    this.#destinations = generateDestinations();
    this.#points = generatePoints(this.#offersByType);
  }

  get points() {return this.#points;}
  get destinations() {return this.#destinations;}
  get offersByType() {return this.#offersByType;}

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
