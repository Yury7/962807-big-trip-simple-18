import dayjs from 'dayjs';
import { BASE_PRICE_REGULAR } from '../const';

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);
const getHours = (date) => dayjs(date).format('HH:mm');
const getHumanizedDate = (date) => dayjs(date).format('MMM D');
const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getInputTypeDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
const getDateTimeType = (data) => dayjs(data).format('YYYY-MM-DDTHH:mm');
const getDuration = (from, to) => dayjs(to).diff(from, 'm');
const getISOTypeDate = (date) => dayjs(date).toISOString();

const toKebabCase = (string) => string
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const isPointVisited = (dateFrom) => dateFrom && dayjs(dateFrom).isBefore(dayjs(), 'minute');
const isPointUnvisited = (dateFrom) => dateFrom && dayjs(dateFrom).isAfter(dayjs(),'minute');


const getWeightForNullDate = (dateA, dateB) => {
  if (!dateA && !dateB ) {
    return 0;
  }

  if (!dateA) {
    return 1;
  }

  if (!dateB ) {
    return -1;
  }

  return null;
};

const sortByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortByPrice = (pointA, pointB) => {
  if (pointA.basePrice < pointB.basePrice) {
    return 1;
  }
  if (pointA.basePrice === pointB.basePrice) {
    return 0;
  }
  if (pointA.basePrice > pointB.basePrice) {
    return -1;
  }
};

const isDatesEqual = (dateA, dateB) => (!dateA && !dateB ) || dayjs(dateA).isSame(dateB, 'D');

const isPriseEqual = (priceA, priceB) => (Number(priceA).toFixed() === Number(priceB).toFixed());

const isPriseValid = (price) => !isNaN(price) && BASE_PRICE_REGULAR.test(price);

const isPointEqual = (pointA, pointB) => pointA.id === pointB.id &&
  pointA.basePrice === pointB.basePrice &&
  pointA.dateFrom === pointB.dateFrom &&
  pointA.dateTo === pointB.dateTo &&
  pointA.destination === pointB.destination &&
  pointA.type === pointB.type &&
  pointA.offers.slice().sort().join() === pointB.offers.slice().sort().join();

export {
  capitalizeWord,
  getDate,
  getDateTimeType,
  getDuration,
  getHours,
  getHumanizedDate,
  getISOTypeDate,
  getInputTypeDate,
  isDatesEqual,
  isPointEqual,
  isPointUnvisited,
  isPointVisited,
  isPriseEqual,
  isPriseValid,
  sortByDay,
  sortByPrice,
  toKebabCase,
};
