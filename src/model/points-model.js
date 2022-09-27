import {generatePoint} from '../mock/points.js';
import {generateData} from '../utils/common.js';
import { POINTS_AMOUNT } from '../const.js';
import { destinations } from '../mock/destination.js';
import { offersByType } from '../mock/offer.js';

export default class PointsModel {
  #points = generateData(POINTS_AMOUNT, generatePoint);
  #destinations = destinations;
  #offersByType = offersByType;

  get points() {return this.#points;}
  get destinations() {return this.#destinations;}
  get offersByType() {return this.#offersByType;}
}
