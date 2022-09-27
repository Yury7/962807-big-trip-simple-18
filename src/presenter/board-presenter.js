import { render, RenderPosition } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem, removeItem } from '../utils/common.js';


export default class PointBoardPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #points = [];
  #sortComponent = new SortView();
  #pointListComponent = new PointListView();
  #emptyListView = new EmptyListView();
  #pointPresenter = new Map();

  #renderSorting = () => render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
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
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handlePointRemove = (removablePoint) => {
    this.#points = removeItem(this.#points, removablePoint);
    this.#pointPresenter.get(removablePoint.id).destroy(removablePoint);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  init = (pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    if (!this.#pointsModel.points) {return this.#renderEmptyList();}
    this.#points = [...this.#pointsModel.points];
    this.#renderSorting();
    this.#renderPointList();
    this.#renderPoints();

  };
}
