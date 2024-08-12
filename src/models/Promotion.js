import { async } from 'validate.js';
import api from '../config/api';
import Request from '../helper/Request';

const get = async () => {
  try {
    const {data, vouchers} = await Request.backend('GET', api.GET_PROMOTIONS);
    return {data, vouchers};
  } catch (err) {
    console.log('error Promotion@get', err);
    return [];
  }
};

const mine = async () => {
  try {
    const {data} = await Request.backend('GET', `${api.GET_PROMOTIONS}?mine=1`);
    return data;
  } catch (err) {
    console.log('error Promotion@mine', err);
    return [];
  }
};

const used = async () => {
  try {
    const {data} = await Request.backend('GET', `${api.GET_PROMOTIONS}?used=1`);
    return data;
  } catch (err) {
    console.log('error Promotion@mine', err);
    return [];
  }
};

const voucher = async () => {
  try {
    const {data} = await Request.backend(
      'GET',
      `${api.GET_PROMOTIONS}?voucher=1`,
    );
    return data;
  } catch (err) {
    console.log('error Promotion@mine', err);
    return [];
  }
};

const storeVoucher = async (params) =>{
  try {
    const {data} = await Request.backend('POST', `${api.SET_STOREVOUCHER}`,params);
    return data;
  } catch (err) {
    console.log('error Promotion@mine', err);
    return [];
  }
}

export default {
  get,
  mine,
  used,
  voucher,
  storeVoucher
};
