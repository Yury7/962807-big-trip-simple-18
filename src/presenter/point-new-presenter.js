import { UpdateType, UserAction } from '../const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import PointEditView from '../view/point-edit-view.js';


export default class PointNewPresenter {
  #pointListContainer = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #changeData = null;
  #destinations = null;
  #offers = null;

  constructor(pointListContainer, changeData, destinations, offers) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init = (callback) => {
    this.#destroyCallback = callback;
    if (this.#pointEditComponent !== null) {return;}

    this.#pointEditComponent = new PointEditView(undefined, this.#destinations, this.#offers);
    this.#pointEditComponent.setSubmitFormHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteItemHandler(this.#handleFormCancel);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {return;}
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
    if (!isEscapeKey(evt)) {return;}
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
