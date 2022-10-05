import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const createEmptyListTemplate = (emptyListType) =>{

  const getEmptyListMessage = () => {

    switch (emptyListType) {
      case FilterType.EVERYTHING:
        return 'Click New Event to create your first point';
      case FilterType.FUTURE:
        return 'There are no future events now';
      case FilterType.PAST:
        return 'There are no past events now';
    }
    return emptyListType;
  };

  return `<p class="trip-events__msg">${getEmptyListMessage()}</p>`;
};

export default class EmptyListView extends AbstractView {
  #emptyListType = null;

  constructor(emptyListType) {
    super();
    this.#emptyListType = emptyListType;
  }

  get template() {
    return createEmptyListTemplate(this.#emptyListType);
  }

}
