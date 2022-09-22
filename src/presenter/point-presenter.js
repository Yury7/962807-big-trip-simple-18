import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';

export default class PointPresenter {
  #pointListContainer = null;
  #pointItemComponent = null;
  #pointEditComponent = null;
  #point = null;

  constructor(pointListContainer) {
    this.#pointListContainer = pointListContainer;
  }

  #replaceFormToItem = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (!isEscapeKey(evt)) {return;}
    this.#replaceFormToItem();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  init = (point) => {
    this.#point = point;
    this.#pointItemComponent = new PointItemView(point);
    this.#pointEditComponent = new PointEditView(point);

    render(this.#pointItemComponent, this.#pointListContainer);

    this.#pointItemComponent.setEditHandler(this.#replacePointToForm);
    this.#pointEditComponent.setCloseFormHandler(this.#replaceFormToItem);
    this.#pointEditComponent.setSaveFormHandler(this.#replaceFormToItem);
  };

}
