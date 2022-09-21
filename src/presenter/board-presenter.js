import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointItemView from '../view/point-item-view.js';
import {render} from '../render.js';
import {isEscapeKey} from '../utils.js';


export default class PointBoardPresenter {
  #pointsContainer = null;
  #pointsModel = null;
  #points = null;
  #pointListComponent = new PointListView();
  #filterContainer = document.querySelector('.trip-controls__filters');

  #renderPoint = (point) => {

    const pointItemComponent = new PointItemView(point);

    const pointEditComponent = new PointEditView(point);

    render(pointItemComponent, this.#pointListComponent.element);

    const replaceFormToItem = () => {
      this.#pointListComponent.element.replaceChild(
        pointItemComponent.element,
        pointEditComponent.element
      );
    };

    const onEscKeyDown = (evt) => {
      if (!isEscapeKey(evt)) {return;}
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const replacePointToForm = () => {
      this.#pointListComponent.element.replaceChild(
        pointEditComponent.element,
        pointItemComponent.element
      );

      document.addEventListener('keydown', onEscKeyDown);
    };

    pointItemComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', replacePointToForm);


    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    });


    pointEditComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', replaceFormToItem);
  };

  init = (pointsContainer, pointsModel) => {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#pointsContainer);
    render(this.#pointListComponent, this.#pointsContainer);

    for (let i = 1; i < this.#points.length - 1; i++){
      this.#renderPoint(this.#points[i]);
    }
  };
}
