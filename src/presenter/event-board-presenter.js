import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import {render} from '../render.js';

export default class EventBoardPresenter {
  eventListComponent = new EventListView();
  filterContainer = document.querySelector('.trip-controls__filters');

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;
    render(new FilterView(), this.filterContainer);
    render(new SortView(), this.eventsContainer);
    render(this.eventListComponent, eventsContainer);
    render(new EventEditView(), this.eventListComponent.getElement());
    for (let i = 0; i < 3; i++){
      render(new EventItemView(), this.eventListComponent.getElement());
    }
  };
}
