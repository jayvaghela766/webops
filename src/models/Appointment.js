import api from '../config/api';
import Request from '../helper/Request';

const saluations = [
  {
    label: 'Mr',
    value: 'Mr'
  },
  {
    label: 'Mrs',
    value: 'Mrs'
  },
  {
    value: 'Mdm',
    label: 'Mdm'
  },
  {
    value: 'Ms',
    label: 'Miss'
  },
  {
    value: 'Dr',
    label: 'Dr'
  }
];

const STATUS = {
  PENDING: 1,
  CONFIRMED: 2,
  REJECTED: 3,
  CANCELLED: 4,
};

const mine = async (status = null) => {
  try {
    const url = status ? `${api.GET_MY_APPOINTMENT}?status=${status}` : api.GET_MY_APPOINTMENT;
    return await Request.backend('GET', url);
  } catch (err) {
    console.log('error appointment@mine', err);
    return [];
  }
};

const getEnquiryList = async (params = null) => {
  try {
    const { data } = await Request.backend('GET', api.GET_ENQUIRY_LIST, null, params);
    return data;
  } catch (err) {
    console.log('error appointment@getEnquiryList', err);
    return [];
  }
};

const getAvailability = async (params) => {
  try {
    return await Request.backend('GET', api.GET_APPOINTMENT_AVAILABILITY, null, params);
  } catch (err) {
    console.log('error appointment@getAvailability', err);
    return [];
  }
};

const store = async (data) => {
  try {
    return await Request.backend('POST', api.STORE_APPOINTMENT, data);
  } catch (err) {
    console.log('error Appointment@store', err);
    return false;
  }
};

const update = async (id, data) => {
  try {
    return await Request.backend('PATCH', `${api.STORE_APPOINTMENT}/${id}`, data);
  } catch (err) {
    console.log('error Appointment@update', err);
    return false;
  }
};

const updateStatus = async (id, statusId) => {
  try {
    return await Request.backend('POST', `${api.UPDATE_APPOINTMENT_STATUS}/${id}`, { appointment_status_id: statusId });
  } catch (err) {
    console.log('error Appointment@updateStatus', err);
    return false;
  }
};

export default {
  getEnquiryList,
  getAvailability,
  saluations,
  store,
  mine,
  updateStatus,
  update,
  STATUS
};
