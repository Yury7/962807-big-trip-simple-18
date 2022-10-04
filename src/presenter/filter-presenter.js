import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {FilterType, UpdateType} from '../const.js';
import { isPointVisited, isPointUnvisited } from '../utils/point.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;
  #filterStatus = {
    [FilterType.EVERYTHING]: true,
    [FilterType.FUTURE]: false,
    [FilterType.PAST]: false,
  };

  constructor(filterContainer, filterModel, pointsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#filterModel.addObserver(this.#handleFilterModelEvent);
    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
  }


  get filters() {
    return Object.values(FilterType);
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter, this.#filterStatus);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #updateFilterStatus = () => {
    const points = this.#pointsModel.points;

    const isPoints = !!points.length;
    const isVisitedPoints = points.findIndex((point) => isPointVisited(point.dateFrom)) !== -1;
    const isUnvisitedPoints = points.findIndex((point) => isPointUnvisited(point.dateFrom)) !== -1;


    this.#filterStatus[FilterType.EVERYTHING] = isPoints;
    this.#filterStatus[FilterType.FUTURE] = isUnvisitedPoints;
    this.#filterStatus[FilterType.PAST] = isVisitedPoints;

  };

  #handleFilterModelEvent = () => {
    this.init();
  };

  #handlePointsModelEvent = () => {
    this.#updateFilterStatus();
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
