import api from '../config/api';
import Request from '../helper/Request';

const ADDRESS_TYPES = [
  {
    label: 'Billing',
    value: '1'
  },
  {
    label: 'Shipping Address',
    value: '2'
  },
  {
    label: 'Alternate Address',
    value: '3'
  },
];

const mine = async () => {
  try {
    const { data } = await Request.backend('GET', `${api.GET_MY_ADDRESSES}`);
    return data || {};
  } catch (err) {
    console.log('error Address@mine', err);
    return {};
  }
};

const store = async (data) => {
  try {
    return await Request.backend('POST', `${api.UPDATE_ADDRESS}`, data);
  } catch (err) {
    console.log('error Address@store', err);
    return [];
  }
};

const update = async (id, data) => {
  try {
    return await Request.backend('PATCH', `${api.UPDATE_ADDRESS}/${id}`, data);
  } catch (err) {
    console.log('error Address@update', err);
    return [];
  }
};

const destroy = async (id) => {
  try {
    return await Request.backend('DELETE', `${api.ADDRESSES}/${id}`);
  } catch (err) {
    console.log('error Address@destroy', err);
    return [];
  }
};

export default {
  ADDRESS_TYPES,
  store,
  update,
  mine,
  destroy
};
