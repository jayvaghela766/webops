import api from '../config/api';
import Request from '../helper/Request';

const all = async (page = 1, params = null) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_SERVICES}?page=${page}`, null, params);
    return data;
  } catch (err) {
    console.log('error Service@all', err);
    return [];
  }
};

const get = async () => {
  try {
    const { data } = await Request.backend('GET', api.GET_SERVICES);
    return data.data;
  } catch (err) {
    console.log('error Service@get', err);
    return [];
  }
};

export default {
  all,
  get,
};
