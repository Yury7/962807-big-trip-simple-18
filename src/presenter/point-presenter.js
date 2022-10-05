import { UpdateType, UserAction } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import { isDatesEqual, isPointEqual, isPriseEqual } from '../utils/point.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #changeData = null;
  #changeMode = null;
  #destinations = null;
  #destinationsModel = null;
  #mode = Mode.DEFAULT;
  #offersModel = null;
  #point = null;
  #pointEditComponent = null;
  #pointItemComponent = null;
  #pointListContainer = null;

  constructor(pointListContainer, changeData, changeMode, destinationsModel, offersModel) {
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#destinations = destinationsModel.destinations;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = pointListContainer;
  }

  init = (point) => {
    this.#point = point;
    const prevPointComponent = this.#pointItemComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointItemComponent = new PointItemView(point, this.#destinations, this.#offersModel.offers);
    this.#pointEditComponent = new PointEditView(point, this.#destinationsModel, this.#offersModel);

    this.#pointItemComponent.setEditHandler(this.#replacePointToForm);
    this.#pointItemComponent.setFavoriteClickHandler(this.#handlePointFavorite);
    this.#pointEditComponent.setCloseFormHandler(this.#handleFormClose);
    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteItemHandler(this.#handleFormDelete);

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointItemComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointItemComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointItemComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointItemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDeleting: false,
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#pointItemComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (!isEscapeKey(evt)) {
      return;
    }
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

  #handlePointFavorite = (update) => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      update);
  };

  #handleFormSubmit = (update) => {
    if (isPointEqual(update, this.#point)) {
      return this.#replaceFormToPoint();
    }

    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
    !isPriseEqual(this.#point.basePrice, update.basePrice);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update);
  };

  #handleFormDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFormClose = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };
}
