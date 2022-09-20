import EventBoardPresenter from './presenter/event-board-presenter.js';
import EventsModel from './model/events-model.js';


const eventBoardPresenter = new EventBoardPresenter();
const eventsModel = new EventsModel();
const siteMainElement = document.querySelector('.trip-events');

eventBoardPresenter.init(siteMainElement, eventsModel);
