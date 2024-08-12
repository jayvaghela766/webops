import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    return await Request.backend('GET', api.GET_BRANDS);
  } catch (err) {
    console.log('error Brands@get', err);
    return [];
  }
};

export default {
  get,
};
