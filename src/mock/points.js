import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {
  pointPrice, POINT_TYPES, timeBuffer
} from '../const.js';
import { generateData, getRandomArrayItem, getRandomInteger, popRandomArrayItem } from '../utils/common.js';
import { destinations } from './destination.js';
import { offersByType } from './offer.js';

const generateDateFrom = () => {
  if (!timeBuffer.start) {
    timeBuffer.start = dayjs().set('hour', timeBuffer.startDayTime).toISOString();
    return timeBuffer.start;
  }
  timeBuffer.start = dayjs(timeBuffer.start)
    .add(timeBuffer.dayDelta, 'day')
    .set('hour', getRandomInteger(timeBuffer.startDayTime, timeBuffer.endDayTime))
    .toISOString();

  return timeBuffer.start;
};

const generateDateTo = () => {
  timeBuffer.end = dayjs(timeBuffer.start)
    .add(getRandomInteger(timeBuffer.minDuration, timeBuffer.maxDuration), 'm')
    .toISOString();
  return timeBuffer.end;
};

const destinationID = generateData(destinations?.length, (index) => index );

const getRandomOffersIds = (type) => {
  const offersByTypeCount = offersByType.find((offer) => offer.type === type).offers?.length;
  if (!offersByTypeCount) {return [];}
  const offersIds = Array.from({length: offersByTypeCount}, (i, k) => k);
  return Array.from({length: getRandomInteger(0, offersByTypeCount)}, () => popRandomArrayItem(offersIds));
};

const generatePoint = () => {
  const type = getRandomArrayItem(POINT_TYPES);
  return{
    id: nanoid(),
    basePrice: getRandomInteger(pointPrice.min, pointPrice.max),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: popRandomArrayItem(destinationID),
    type,
    offers: getRandomOffersIds(type),
  };
};


export { generatePoint };
