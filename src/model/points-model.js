import {generatePoint} from '../mock/points.js';
import {generateData} from '../utils/common.js';
import { POINTS_AMOUNT } from '../const.js';

export default class PointsModel {
  #points = generateData(POINTS_AMOUNT, generatePoint);
  get points() {return this.#points;}
}
