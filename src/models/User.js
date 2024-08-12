import api from '../config/api';
import Request from '../helper/Request';

const USER_TYPE = {
  CUSTOMER: 5,
};

const store = async (data) => {
  try {
    return await Request.backend('POST', `${api.SIGN_UP}`, data);
  } catch (err) {
    console.log('error User@store', err);
    return [];
  }
};

const update = async (id, data) => {
  try {
    return await Request.backend('PATCH', `${api.GET_USER}/${id}`, data);
  } catch (err) {
    console.log('error User@update', err);
    return [];
  }
};

const updatePassword = async (data) => {
  try {
    return await Request.backend('PATCH', `${api.UPDATE_PASSWORD}`, data);
  } catch (err) {
    console.log('error User@updatePassword', err);
    return [];
  }
};

const resetPassword = async (data) => {
  try {
    return await Request.backend('PATCH', api.RESET_PASSWORD , data);
  } catch (err) {
    console.log('error User@resetPassword', err);
    return [];
  }
};

const accountDeletion = async (data) => {
  try {
    return await Request.backend('POST', api.ACCOUNT_DELETION_REQUEST , data);
  } catch (err) {
    console.log('error User@accountDeletion', err);
    return null;
  }
};

export default {
  store,
  update,
  updatePassword,
  resetPassword,
  USER_TYPE,
  accountDeletion
};
