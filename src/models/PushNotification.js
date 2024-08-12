import { Platform } from "react-native";
import api from "../config/api";
import Request from "../helper/Request";
import Storage from "../helper/Storage";

const getParams = (payload) => {
  switch(payload.screen) {
    default:
      return {};
  };
};

const updateDeviceToken = async (deviceToken) => {
  const data = {
    token: deviceToken,
    platform: Platform.OS
  };

  const response = await Request.backend('POST', api.UPDATE_DEVICE_TOKEN, data);
  if (response.success) {
    await Storage.set('deviceToken', deviceToken);
  }
};

const deleteDeviceId = async () => {
  try {
    const deviceToken = await Storage.get('deviceToken');
    if (deviceToken) {
      return await Request.backend('DELETE', `${api.UPDATE_DEVICE_TOKEN}`, { token: deviceToken });
    }
  } catch(error) {
    console.log('Error PushNotification@deleteDeviceId', error);
    return false;
  }
};

export default {
  getParams,
  updateDeviceToken,
  deleteDeviceId
};