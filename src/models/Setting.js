import api from '../config/api';
import Request from '../helper/Request';

const updateMarketing = async (data) => {
  try {
    return await Request.backend('POST', api.UPDATE_SETTING_MARKETING, data);
  } catch (err) {
    console.log('error Setting@updateMarketing', err);
    return [];
  }
};

export default {
  updateMarketing,
};
