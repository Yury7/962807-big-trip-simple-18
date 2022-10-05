import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';


export default class PointNewPresenter {
  #changeData = null;
  #destinationsModel = null;
  #destroyCallback = null;
  #offersModel = null;
  #pointEditComponent = null;
  #pointListContainer = null;

  constructor(pointListContainer, changeData, destinationsModel, offersModel) {
    this.#changeData = changeData;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointListContainer = pointListContainer;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent) {
      return;
    }

    this.#pointEditComponent = new PointEditView(undefined, this.#destinationsModel, this.#offersModel);
    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteItemHandler(this.#handleFormCancel);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (!this.#pointEditComponent) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };

  #onEscKeyDown = (evt) => {
    if (!isEscapeKey(evt)) {
      return;
    }
    evt.preventDefault();
    this.destroy();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  };

  #handleFormCancel = () => {
    this.destroy();
  };
}
