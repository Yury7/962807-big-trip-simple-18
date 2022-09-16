import dayjs from 'dayjs';
import {
  eventPrice, POINT_TYPES, timeBuffer
} from '../const.js';
import { generateDataArray, getRandomArrayItem, getRandomInteger, popRandomArrayItem } from '../utils.js';
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

const destinationID = generateDataArray(destinations.length - 1, (index) => index );

const generateEvent = (index) => {
  const type = getRandomArrayItem(POINT_TYPES);
  return{
    id: index,
    basePrice: getRandomInteger(eventPrice.min, eventPrice.max),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: popRandomArrayItem(destinationID),
    type,
    offers: offers.find((offer) => offer.type === type).offers,
  };
};


export { generateEvent };
