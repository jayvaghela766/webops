import api from '../config/api';
import Request from '../helper/Request';

const AREAS = [
  { label: 'Central', value: '1' },
  { label: 'North', value: '2' },
  { label: 'South', value: '3' },
  { label: 'East', value: '4' },
  { label: 'West', value: '5' },
];

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const all = async (page = 1, params = null) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_STORES}?page=${page}`, null, params);
    return data;
  } catch (err) {
    console.log('error Stores@all', err);
    return [];
  }
};

export default {
  AREAS,
  DAYS,
  all
};
