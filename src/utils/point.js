import dayjs from 'dayjs';

const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);
const getHours = (date) => dayjs(date).format('HH:mm');
const getHumanizedDate = (date) => dayjs(date).format('MMM D');
const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const getInputTypeDate = (date) => dayjs(date).format('DD/MM/YY HH:MM');
const getDateTimeType = (data) =>dayjs(data).format('YYYY-MM-DDTHH:mm');
const getDuration = (from, to) => dayjs(to).diff(from, 'm');

export {
  getDate,
  getHours,
  getHumanizedDate,
  getInputTypeDate,
  getDateTimeType,
  getDuration,
  capitalizeWord,
};
