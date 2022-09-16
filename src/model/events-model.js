import {generateEvent} from '../mock/events.js';
import {generateDataArray} from '../utils.js';
import { POINTS_AMOUNT } from '../const.js';

export default class EventsModel {
  events = generateDataArray(POINTS_AMOUNT, generateEvent);
  getEvents = () => this.events;
}
