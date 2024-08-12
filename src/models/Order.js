import api from '../config/api';
import Request from '../helper/Request';

const all = async (page = 1, params = null) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_MY_ORDERS}?page=${page}`, null, params);
    return data;
  } catch (err) {
    console.log('error Order@all', err);
    return [];
  }
};

const get = async (id) => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_MY_ORDERS}/${id}`);
    return data;
  } catch (err) {
    console.log('error Order@get', err);
    return {}
  }
};

const store = async (data) => {
  try {
    return await Request.backend('POST', api.STORE_ORDER, data);
  } catch (err) {
    console.log('error Order@store', err);
    return [];
  }
};

const setAsDelivered = async (id) => {
  try {
    return await Request.backend('POST', `${api.ORDER_SET_AS_DELIVERED}/${id}`);
  } catch (err) {
    console.log('error Order@setAsDelivered', err);
    return [];
  }
};

export default {
  all,
  get,
  store,
  setAsDelivered
};
