import { render, RenderPosition } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem, removeItem } from '../utils/common.js';
import { sortByDay, sortByPrice } from '../utils/point.js';
import { SortType } from '../const.js';


export default class PointBoardPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #points = [];
  #sortComponent = new SortView();
  #pointListComponent = new PointListView();
  #emptyListView = new EmptyListView();
  #pointPresenter = new Map();

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

  #renderSorting = () => {
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPointList = () => render(this.#pointListComponent, this.#pointsContainer);
  #renderEmptyList = () => render(this.#emptyListView, this.#pointsContainer, RenderPosition.AFTERBEGIN);

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handlePointRemove = (removablePoint) => {
    this.#points = removeItem(this.#points, removablePoint);
    this.#pointPresenter.get(removablePoint.id).destroy(removablePoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortType.PRISE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points.sort(sortByDay);
        break;
    }
    this.#currentSortType = sortType;
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  init = (pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    if (!this.#pointsModel.points) {return this.#renderEmptyList();}
    this.#points = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = [...this.#pointsModel.points];
    this.#renderSorting();
    this.#renderPointList();
    this.#renderPoints();

  };
}
