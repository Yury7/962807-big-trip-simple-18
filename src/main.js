import PointsApiService from './api/points-api-service.js';
import OffersApiService from './api/offers-api-service.js';
import DestinationsApiService from './api/destinations-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import { render } from './framework/render.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';

const siteMainElement = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newPointButtonContainer = document.querySelector('.trip-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter(siteMainElement, filterModel, pointsModel, destinationsModel, offersModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, pointsModel);

const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  boardPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};


filterPresenter.init();
boardPresenter.init();

destinationsModel.init();
offersModel.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, newPointButtonContainer);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });
