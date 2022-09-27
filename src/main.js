import {render} from './framework/render.js';
import PointBoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';
import FilterView from './view/filter-view.js';

const pointBoardPresenter = new PointBoardPresenter();
const pointsModel = new PointsModel();
const siteMainElement = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');

const filters = generateFilter(pointsModel.points);
render(new FilterView(filters), filterContainer);


pointBoardPresenter.init(siteMainElement, pointsModel);
