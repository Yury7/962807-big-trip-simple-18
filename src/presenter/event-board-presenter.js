import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import {render} from '../render.js';


export default class EventBoardPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #events = null;
  #eventListComponent = new EventListView();
  #filterContainer = document.querySelector('.trip-controls__filters');
  init = (eventsContainer, eventsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);
    render(new EventEditView(this.#events[0]), this.#eventListComponent.element);
    for (let i = 1; i < this.#events.length - 1; i++){
      render(new EventItemView(this.#events[i]), this.#eventListComponent.element);
    }
  };
}
