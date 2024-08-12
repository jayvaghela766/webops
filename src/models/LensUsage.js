import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    return await Request.backend('GET', api.GET_LENS_USAGES);
  } catch (err) {
    console.log('error LensUsage@get', err);
    return [];
  }
};

export default {
  get,
};
