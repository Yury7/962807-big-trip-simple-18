import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import {render} from '../render.js';
import {isEscapeKey} from '../utils.js';


export default class EventBoardPresenter {
  #eventsContainer = null;
  #eventsModel = null;
  #events = null;
  #eventListComponent = new EventListView();
  #filterContainer = document.querySelector('.trip-controls__filters');
  //-------------------------------------------
  #renderEvent = (event) => {

    const eventItemComponent = new EventItemView(
      event
      // getEventOffers(event.offers, this.#offers),
      // getEventDestination(event.destination, this.#destinations)
    );

    const eventEditComponent = new EventEditView(
      event
      // getEventOffers(event.offers, this.#offers),
      // getEventDestination(event.destination, this.#destinations),
      // this.#offers
    );

    render(eventItemComponent, this.#eventListComponent.element);

    const replaceFormToItem = () => {
      this.#eventListComponent.element.replaceChild(
        eventItemComponent.element,
        eventEditComponent.element
      );
    };

    const onEscKeyDown = (evt) => {
      if (!isEscapeKey(evt)) {return;}
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    const replaceEventToForm = () => {
      this.#eventListComponent.element.replaceChild(
        eventEditComponent.element,
        eventItemComponent.element
      );

      document.addEventListener('keydown', onEscKeyDown);
    };

    eventItemComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', replaceEventToForm);


    eventEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToItem();
    });


    eventEditComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', replaceFormToItem);
  };

  init = (eventsContainer, eventsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#events = [...this.#eventsModel.events];
    render(new FilterView(), this.#filterContainer);
    render(new SortView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);

    // console.log(eventItemComponent);

    for (let i = 1; i < this.#events.length - 1; i++){
      this.#renderEvent(this.#events[i]);
    }
  };
}
