import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayItem = (array) => {
  if (!array) {return null;}
  if (array.length === 0) {return [];}
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayItems = (array, limit = array.length) => {
  const maxLength = (limit < array.length) ? limit : array.length;
  const length = getRandomInteger(1, maxLength);
  return Array.from({length}, () => array[getRandomInteger(0, array.length - 1)]);
};

const popRandomArrayItem = (array) => {
  if (!array || array.length === 0) {return null;}
  const lastIndex = array.length - 1;
  const randomIndex = getRandomInteger(0, lastIndex);
  [array[lastIndex], array[randomIndex]] = [array[randomIndex], array[lastIndex]];
  return array.pop();
};

const generateData = (length, generator) =>(length) ?
  Array.from({length}, (_, index) => generator(index)) :
  null;

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getHours = (date) => dayjs(date).format('HH:mm');
const getHumanizedDate = (date) => dayjs(date).format('MMM D');
const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getInputTypeDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
const getDateTimeType = (data) =>dayjs(data).format('YYYY-MM-DDTHH:mm');
const getDuration = (from, to) => dayjs(to).diff(from, 'm');

export {
  generateData,
  getDate,
  getHours,
  getHumanizedDate,
  getInputTypeDate,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomInteger,
  popRandomArrayItem,
  getDateTimeType,
  getDuration,
  capitalizeWord,
  isEscapeKey
};
