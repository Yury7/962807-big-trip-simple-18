import {FilterType} from '../const';
import {isPointVisited} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => (points) ?
    points.filter((point) => !isPointVisited(point.dateFrom)) :
    null,
  [FilterType.PAST]: (points) => (points) ?
    points.filter((point) => isPointVisited(point.dateFrom)) :
    null,
};

export {filter};
