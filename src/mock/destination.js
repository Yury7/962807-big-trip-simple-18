import {
  DESCRIPTIONS, DESCRIPTIONS_MAX_AMOUNT, DESTINATIONS, PICTURES_MAX_AMOUNT, POINTS_AMOUNT
} from '../const.js';
import {
  generateData, getRandomArrayItem,
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
    pictures: generateData(picturesCount, generatePicture),
  };
};

const destinations = generateData(POINTS_AMOUNT, generateDestination);
export {destinations};
