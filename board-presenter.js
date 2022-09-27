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
  #SortComponent = new SortView();
  #pointListComponent = new PointListView();
  #emptyListView = new EmptyListView();
  #pointPresenter = new Map();

  #renderSorting = () => render(this.#SortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  #renderPointList = () => render(this.#pointListComponent, this.#pointsContainer);
  #renderEmptyList = () => render(this.#emptyListView, this.#pointsContainer, RenderPosition.AFTERBEGIN);

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    this.#points.slice().forEach((point) => this.#renderPoint(point));
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handlePointRemove = (removable) => {
    this.#points = removeItem(this.#points, removable);
    this.#pointPresenter.get(removable.id).destroy(removable);
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
