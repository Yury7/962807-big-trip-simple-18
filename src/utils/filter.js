import {FilterType} from '../const';
import {isPointVisited} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => !isPointVisited(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointVisited(point.dateFrom))
};
export {filter};
