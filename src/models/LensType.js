import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    return await Request.backend('GET', api.GET_LENS_TYPES);
  } catch (err) {
    console.log('error LensType@get', err);
    return [];
  }
};

export default {
  get,
};
