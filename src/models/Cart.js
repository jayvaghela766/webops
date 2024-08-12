import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    const { data } = await Request.backend('GET', api.STORE_CART);
    return data;
  } catch (err) {
    console.log('error Cart@get', err);
    return [];
  }
};

const store = async (data) => {
  try {
    return await Request.backend('POST', api.STORE_CART, data);
  } catch (err) {
    console.log('error Cart@store', err);
    return [];
  }
};

const update = async (data) => {
  try {
    return await Request.backend('PATCH', api.STORE_CART, data);
  } catch (err) {
    console.log('error Cart@update', err);
    return [];
  }
};

export default {
  get,
  store,
  update
};
