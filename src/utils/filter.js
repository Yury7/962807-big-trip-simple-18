import {FilterType} from '../const';
import {isPointVisited} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => (points) ?
    points.filter((point) => !isPointVisited(point.dateTo)) :
    null,
  [FilterType.PAST]: (points) => (points) ?
    points.filter((point) => isPointVisited(point.dateTo)) :
    null,
};

export {filter};
