import dayjs from 'dayjs';
import {
  pointPrice, POINT_TYPES, timeBuffer
} from '../const.js';
import { generateData, getRandomArrayItem, getRandomInteger, popRandomArrayItem } from '../utils.js';
import { destinations } from './destination.js';
import { offers } from './offer.js';

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

const generatePoint = (index) => {
  const type = getRandomArrayItem(POINT_TYPES);
  return{
    id: index,
    basePrice: getRandomInteger(pointPrice.min, pointPrice.max),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: popRandomArrayItem(destinationID),
    type,
    offers: offers.find((offer) => offer.type === type).offers,
  };
};


export { generatePoint };
