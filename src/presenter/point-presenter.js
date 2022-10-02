import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import {UserAction, UpdateType} from '../const.js';
import {isDatesEqual, isPriseEqual} from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointItemComponent = null;
  #pointEditComponent = null;
  #changeData = null;
  #changeMode = null;
  #pointsModel = null;
  #point = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, changeMode, pointsModel, destinations, offers) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#pointsModel = pointsModel;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (!isEscapeKey(evt)) {return;}
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointItemComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #handleFormSubmit = (update) => {
    const isMajorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !isPriseEqual(this.#point.basePrice, update.basePrice);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMajorUpdate ? UpdateType.MAJOR : UpdateType.PATCH,
      update);
  };

  #handleFormDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleFormClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointItemComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointItemComponent = new PointItemView(point, this.#destinations, this.#offers);
    this.#pointEditComponent = new PointEditView(point, this.#destinations, this.#offers);

    this.#pointItemComponent.setEditHandler(this.#replacePointToForm);
    this.#pointEditComponent.setCloseFormHandler(this.#handleFormClose);
    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteItemHandler(this.#handleFormDelete);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointItemComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  };

  destroy = () => {
    remove(this.#pointItemComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };
}
