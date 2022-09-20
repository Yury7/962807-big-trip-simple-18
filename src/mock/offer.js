import {
  offerPrise, OFFERS, OFFERS_BY_TYPE_MAX_AMOUNT, POINT_TYPES
} from '../const.js';
import {
  generateDataArray,
  getRandomArrayItem,
  getRandomInteger,
  popRandomArrayItem
} from '../utils.js';

const generateOffer = (index) => ({
  id: index,
  title: getRandomArrayItem(OFFERS),
  price: getRandomInteger(offerPrise.min, offerPrise.max)
});

const pointTypes = POINT_TYPES.slice();

const generateOffersByType = () => ({
  type: popRandomArrayItem(pointTypes) ?? getRandomArrayItem(POINT_TYPES),
  offers: generateDataArray(getRandomInteger(0, OFFERS_BY_TYPE_MAX_AMOUNT), generateOffer)
});

const offers = generateDataArray(POINT_TYPES.length, generateOffersByType);

export {offers};