import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render, RenderPosition, replace} from '../framework/render.js';
import {isEscapeKey} from '../utils/common.js';


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
    const pointItemComponent = new PointItemView(point);
    const pointEditComponent = new PointEditView(point);

    const replaceFormToItem = () => {
      replace(pointItemComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (!isEscapeKey(evt)) {return;}
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const replacePointToForm = () => {
      replace(pointEditComponent, pointItemComponent);
      document.addEventListener('keydown', onEscKeyDown);
    };

    render(pointItemComponent, this.#pointListComponent.element);

    pointItemComponent.setEditHandler(replacePointToForm);
    pointEditComponent.setCloseFormHandler(replaceFormToItem);
    pointEditComponent.setSaveFormHandler(replaceFormToItem);
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
