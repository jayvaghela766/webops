import api from '../config/api';
import Request from '../helper/Request';

const apply = async (data) => {
  try {
    return await Request.backend('POST', api.DISCOUNT_APPLY, data);
  } catch (err) {
    console.log('error Discount@apply', err);
    return {}
  }
};

export default {
  apply
};
