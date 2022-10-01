import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteMainElement = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newPointButtonContainer = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter(siteMainElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, newPointButtonContainer);

newPointButtonComponent.setClickHandler(handleNewPointButtonClick);


filterPresenter.init();
boardPresenter.init();
