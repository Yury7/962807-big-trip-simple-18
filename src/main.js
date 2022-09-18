import PointBoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';


const pointBoardPresenter = new PointBoardPresenter();
const pointsModel = new PointsModel();
const siteMainElement = document.querySelector('.trip-events');

pointBoardPresenter.init(siteMainElement, pointsModel);
