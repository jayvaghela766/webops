import api from "../config/api";
import Request from "../helper/Request";

const store = async (data) => {
  try {
    return await Request.backend('POST', `${api.REFUND}`, data, null, {
      "Content-Type": "multipart/form-data"
    });
  } catch (err) {
    console.log('error Refund@store', err);
    return [];
  }
};

export default {
  store,
};
