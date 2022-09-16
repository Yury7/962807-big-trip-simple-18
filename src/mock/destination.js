import {
  DESCRIPTIONS, DESCRIPTIONS_MAX_AMOUNT, DESTINATIONS, PICTURES_MAX_AMOUNT, POINTS_AMOUNT
} from '../const.js';
import {
  generateDataArray, getRandomArrayItem,
  getRandomArrayItems,
  getRandomInteger
} from '../utils.js';


const generatePicture = () => ({
  src: `/public/img/photos/${getRandomInteger(1, 5)}.jpg`,
  description: 'Event photo'
});

const generateDestination = (index) => {
  const picturesCount = getRandomInteger(1, PICTURES_MAX_AMOUNT);
  return {
    id: index,
    description: getRandomArrayItems(DESCRIPTIONS, DESCRIPTIONS_MAX_AMOUNT).join(' '),
    name: getRandomArrayItem(DESTINATIONS),
    pictures: generateDataArray(picturesCount, generatePicture),
  };
};

const destinations = generateDataArray(POINTS_AMOUNT, generateDestination);

export {destinations};
