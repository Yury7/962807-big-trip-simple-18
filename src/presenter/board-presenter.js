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
  #currentSortType = SortType.DAY;
  #destinationsModel = null;
  #emptyListView = null;
  #filterModel = null;
  #loadingComponent = new LoadingView();
  #offersModel = null;
  #pointListComponent = new PointListView();
  #pointNewPresenter = null;
  #pointPresenterStorage = new Map();
  #pointsContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #loadingStatus = {
    points: true,
    offers: true,
    destinations: true,
    serverError: false
  };

  constructor(pointsContainer, filterModel, pointsModel, destinationsModel, offersModel) {
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;

    this.#destinationsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {

    const points = this.#pointsModel.points;
    if (!points.length) {
      return points;
    }
    const filterType = this.#filterModel.filter;
    const filteredPoints = filter[filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRISE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  rerender = () => {
    this.#renderBoard();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #isLoading = () => Object.values(this.#loadingStatus).includes(true);

  #renderSorting = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  };

  #renderLoading = () => render(this.#loadingComponent, this.#pointsContainer);
  #renderPointList = () => render(this.#pointListComponent, this.#pointsContainer);
  #renderEmptyList = (emptyListType) => {
    this.#emptyListView = new EmptyListView(emptyListType);
    render(this.#emptyListView, this.#pointsContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#handleModeChange, this.#destinationsModel, this.#offersModel);

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

  init = () => {
    if (this.#isLoading()) {
      return this.#renderLoading();
    }
    if (this.#loadingStatus.serverError) {
      return this.#renderEmptyList(this.#loadingStatus.serverError);
    }

    this.#renderBoard();
  };

  #renderBoard = () => {

    this.#pointNewPresenter = new PointNewPresenter(this.#pointListComponent.element, this.#handleViewAction, this.#destinationsModel, this.#offersModel);

    if (!this.points.length) {
      return this.#renderEmptyList(this.#filterModel.filter);
    }
    this.#renderSorting();
    this.#renderPointList();
    this.#renderPoints(this.points);
  };

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterStorage.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterStorage.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterStorage.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenterStorage.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterStorage.get(data.id).resetView();
        this.#pointPresenterStorage.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard(true);
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        if (typeof(data) === 'object') {
          this.#loadingStatus.serverError = data;
        }
        this.#loadingStatus[data] = false;
        if (this.#isLoading()) {
          return;
        }
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
