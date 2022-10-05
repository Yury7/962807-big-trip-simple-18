const BLANK_POINT = {
  id: '',
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destination: '',
  destinationItem: '',
  type: 'bus',
  offers: [],
  offerItems: [],
};
const FilterType = {
  EVERYTHING  : 'everything',
  FUTURE : 'future',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRISE: 'prise',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const AUTHORIZATION = 'Basic fdg4569s045t09e';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const BASE_PRICE_REGULAR = /^[1-9]+[0-9]*$/;

export {
  AUTHORIZATION,
  BASE_PRICE_REGULAR,
  BLANK_POINT,
  END_POINT,
  FilterType,
  Method,
  SortType,
  UpdateType,
  UserAction,
};
