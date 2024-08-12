import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    const { data } = await Request.backend('GET', api.GET_FEATURED_BRANDS);
    return data.data;
  } catch (err) {
    console.log('error Featured@get', err);
    return [];
  }
};

export default {
  get,
};
