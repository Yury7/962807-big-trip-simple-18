import dayjs from 'dayjs';
import {
  pointPrice, POINT_TYPES, POINTS_AMOUNT, timeBuffer
} from '../const.js';
import { generateData, getRandomArrayItem, getRandomInteger, popRandomArrayItem } from '../utils/common.js';

const generateDateFrom = () => {
  if (!timeBuffer.start) {
    timeBuffer.start = dayjs().set('hour', timeBuffer.startDayTime).toISOString();
    return timeBuffer.start;
  }

  if (getRandomInteger(0, 1)) {
    timeBuffer.start = dayjs(timeBuffer.start)
      .add(timeBuffer.dayDelta, 'day')
      .set('hour', getRandomInteger(timeBuffer.startDayTime, timeBuffer.endDayTime))
      .toISOString();
  } else {
    timeBuffer.start = dayjs(timeBuffer.start)
      .subtract(timeBuffer.dayDelta, 'day')
      .set('hour', getRandomInteger(timeBuffer.startDayTime, timeBuffer.endDayTime))
      .toISOString();
  }
  return timeBuffer.start;
};

const generateDateTo = () => {
  timeBuffer.end = dayjs(timeBuffer.start)
    .add(getRandomInteger(timeBuffer.minDuration, timeBuffer.maxDuration), 'm')
    .toISOString();
  return timeBuffer.end;
};

const destinationID = generateData(POINTS_AMOUNT, (index) => index );

const getRandomOffersIds = (type, offersByType) => {
  const offersByTypeCount = offersByType.find((offer) => offer.type === type).offers?.length;
  if (!offersByTypeCount) {return [];}
  const offersIds = Array.from({length: offersByTypeCount}, (i, k) => k);
  return Array.from({length: getRandomInteger(0, offersByTypeCount)}, () => popRandomArrayItem(offersIds));
};

const generatePoint = (offersByType) => {
  const type = getRandomArrayItem(POINT_TYPES);
  return {
    id: '',
    basePrice: getRandomInteger(pointPrice.min, pointPrice.max),
    dateFrom: generateDateFrom(),
    dateTo: generateDateTo(),
    destination: popRandomArrayItem(destinationID),
    type,
    offers: getRandomOffersIds(type, offersByType),
  };
};


const generatePoints = (offersByType) => Array.from({length: POINTS_AMOUNT}, () => generatePoint(offersByType));


export { generatePoints };
