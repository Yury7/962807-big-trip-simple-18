import { render, RenderPosition } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';


export default class PointBoardPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #points = null;
  #SortComponent = new SortView();
  #pointListComponent = new PointListView();
  #emptyListView = new EmptyListView();

  #renderSorting = () => render(this.#SortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  #renderPointList = () => render(this.#pointListComponent, this.#pointsContainer);
  #renderEmptyList = () => render(this.#emptyListView, this.#pointsContainer, RenderPosition.AFTERBEGIN);

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element);
    pointPresenter.init(point);
  };

  #renderPoints = () => {
    this.#points.slice().forEach((point) => this.#renderPoint(point));
  };

  init = (pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    if (!this.#pointsModel.points) {this.#renderEmptyList();}
    this.#points = [...this.#pointsModel.points];
    this.#renderSorting();
    this.#renderPointList();
    this.#renderPoints();
  };
}
