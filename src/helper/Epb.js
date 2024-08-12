import axios from "axios";
import api from "../config/api";

const request = (epbRequestParams) => {
  const { url, data } = epbRequestParams;
  console.log('EPB Request');
  axios.post(url, data).then((res) => {
    console.log('EPB Response: ', res.data);

    axios.post(`${api.BASE_URL}${api.STORE_EPB_LOG}`, {
      url: url,
      payload: data,
      response: res.data
    }).then((res) => console.log('EPB LOGGED', res.data))

  }).catch((error) => {
    console.log('ERR EPB: ', error);

    axios.post(`${api.BASE_URL}${api.STORE_EPB_LOG}`, {
      url: url,
      payload: data,
      response: error
    }).then((res) => console.log('EPB LOGGED', res.data))
  });
};

export default {
  request
};