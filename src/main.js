import EventBoardPresenter from './presenter/event-board-presenter.js';

const eventBoardPresenter = new EventBoardPresenter();
const siteMainElement = document.querySelector('.trip-events');

eventBoardPresenter.init(siteMainElement);
