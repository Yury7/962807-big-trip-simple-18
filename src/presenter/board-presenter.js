import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import EmptyListView from '../view/empty-list-view.js';
import {render, replace} from '../framework/render.js';
import {isEscapeKey} from '../utils/common.js';


export default class PointBoardPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #points = null;
  #emptyListView = new EmptyListView();
  #pointListComponent = new PointListView();

  #renderPoint = (point) => {
    const pointItemComponent = new PointItemView(point);
    const pointEditComponent = new PointEditView(point);

    render(pointItemComponent, this.#pointListComponent.element);


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

    pointItemComponent.setEditHandler(replacePointToForm);
    pointEditComponent.setCloseFormHandler(replaceFormToItem);
    pointEditComponent.setSaveFormHandler(replaceFormToItem);
  };


  init = (pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;

    if (!this.#pointsModel.points) {
      render(this.#emptyListView, this.#pointsContainer);
      return;
    }
    this.#points = [...this.#pointsModel.points];
    render(new SortView(), this.#pointsContainer);
    render(this.#pointListComponent, this.#pointsContainer);
    for (let i = 0; i < this.#points.length; i++){
      this.#renderPoint(this.#points[i]);
    }
  };
}
