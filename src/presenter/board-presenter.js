import { render, RenderPosition, remove } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import PointListView from '../view/point-list-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';
import { sortByDay, sortByPrice } from '../utils/point.js';
import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import {filter} from '../utils/filter.js';


export default class BoardPresenter {
  #pointsContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #destinations = null;
  #offers = null;
  #sortComponent = null;
  #pointListComponent = new PointListView();
  #loadingComponent = new LoadingView();
  #emptyListView = null;
  #pointPresenterStorage = new Map();
  #pointNewPresenter = null;
  #currentSortType = SortType.DAY;
  #loadingStatus = {
    points: true,
    offers: true,
    destinations: true,
  };

  #isLoading = () =>
    Object.values(this.#loadingStatus).includes(true);

  constructor(pointsContainer, filterModel, pointsModel, destinationsModel, offersModel) {
    this.#pointsContainer = pointsContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRISE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #renderSorting = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => render(this.#loadingComponent, this.#pointsContainer);
  #renderPointList = () => render(this.#pointListComponent, this.#pointsContainer);
  #renderEmptyList = () => {
    this.#emptyListView = new EmptyListView(this.#filterModel.filter);
    render(this.#emptyListView, this.#pointsContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#pointsModel, this.#destinations, this.#offers);

    pointPresenter.init(point);
    this.#pointPresenterStorage.set(point.id, pointPresenter);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));

  };

  #clearBoard = (resetSortType = false) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenterStorage.forEach((presenter) => presenter.destroy());
    this.#pointPresenterStorage.clear();

    remove(this.#sortComponent);
    if (this.#emptyListView) {
      remove(this.#emptyListView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

  };

  #renderBoard = () => {
    if (this.#isLoading()) {return this.#renderLoading();}

    this.#destinations = this.#destinationsModel.destinations;
    this.#offers = this.#offersModel.offers;

    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#destinations, this.#offers);

    if (!this.points.length) {return this.#renderEmptyList();}
    this.#renderSorting();
    this.#renderPointList();
    this.#renderPoints(this.points);
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterStorage.get(data.id).resetView();
        this.#pointPresenterStorage.get(data.id).init(data);
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#loadingStatus[data] = false;
        if (this.#isLoading()) {return;}
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenterStorage.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };
}
