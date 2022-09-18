const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
  'Aenean commodo ligula eget dolor',
  'Aenean massa',
  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
  'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem',
  'Nulla consequat massa quis enim',
  'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu',
  'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo',
  'Nullam dictum felis eu pede mollis pretium',
  'Integer tincidunt',
  'Cras dapibus',
  'Vivamus elementum semper nisi',
  'Aenean vulputate eleifend tellus',
  'Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim',
  'Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus',
];

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const OFFERS = [
  'Add breakfast',
  'Add luggage',
  'Add meal',
  'Book tickets',
  'Choose seats',
  'Lunch in city',
  'Order Uber',
  'Rent a car',
  'Switch to comfort class',
  'Travel by train',
  'Upgrade to a business class'
];

const DESTINATIONS = [
  'Amsterdam',
  'Chamonix',
  'Geneva'
];

const pointPrice = {
  min: 100,
  max: 1000,
};

const offerPrise = {
  min: 5,
  max: 120,
};

const timeBuffer = {
  start: '',
  end: '',
  dayDelta: 2,
  startDayTime: 9,
  endDayTime: 18,
  minDuration: 60,
  maxDuration: 320
};

const OFFERS_BY_TYPE_MAX_AMOUNT = 2;
const POINTS_AMOUNT = 10;
const MINUTES_DELTA = 1440;
const PICTURES_MAX_AMOUNT = 4;
const DESCRIPTIONS_MAX_AMOUNT = 5;

export {
  DESCRIPTIONS_MAX_AMOUNT,
  DESCRIPTIONS,
  DESTINATIONS,
  pointPrice,
  MINUTES_DELTA,
  offerPrise,
  OFFERS_BY_TYPE_MAX_AMOUNT,
  OFFERS,
  PICTURES_MAX_AMOUNT,
  POINT_TYPES,
  POINTS_AMOUNT,
  timeBuffer
};
