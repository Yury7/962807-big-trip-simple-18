import dayjs from 'dayjs';

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);
const getHours = (date) => dayjs(date).format('HH:mm');
const getHumanizedDate = (date) => dayjs(date).format('MMM D');
const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getInputTypeDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
const getDateTimeType = (data) =>dayjs(data).format('YYYY-MM-DDTHH:mm');
const getDuration = (from, to) => dayjs(to).diff(from, 'm');


const isPointVisited = (dateFrom) => dateFrom && dayjs(dateFrom).isBefore(dayjs(), 'D');

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
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

export {
  getDate,
  getHours,
  getHumanizedDate,
  getInputTypeDate,
  getDateTimeType,
  getDuration,
  capitalizeWord,
  isPointVisited,
  getWeightForNullDate,
  sortByDay,
  sortByPrice
};
