import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createEmptyListTemplate = (currentFilter) =>{

  const getEmptyListMessage = () => {
    switch (currentFilter) {
      case FilterType.EVERYTHING:
        return 'Click New Event to create your first point';
      case FilterType.FUTURE:
        return 'There are no future events now';
      case FilterType.PAST:
        return 'There are no past events now';
    }
  };

  return `<p class="trip-events__msg">${getEmptyListMessage()}</p>`;
};

export default class EmptyListView extends AbstractView {
  #currentFilter = null;

  constructor(currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createEmptyListTemplate(this.#currentFilter);
  }

}
