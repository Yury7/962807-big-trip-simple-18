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

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const removeItem = (items, removable) => {
  const index = items.findIndex((item) => item.id === removable.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    ...items.slice(index + 1),
  ];
};

export {
  generateData,
  getRandomArrayItem,
  getRandomArrayItems,
  getRandomInteger,
  popRandomArrayItem,
  isEscapeKey,
  updateItem,
  removeItem,
};
