/* eslint-disable no-console */
import { Platform, ToastAndroid } from 'react-native';
import axios from 'axios';
import ReactNativeBlobUtil from 'react-native-blob-util';
import api from '../config/api';
import Storage from './Storage';
import Features from '../helper/Features';
import { navigate } from '../navigations/RootNavigation';
import Epb from './Epb';

const backend = async (method, url, data, params, headers = {}) => {
  try {
    headers['platform'] = Platform.OS;

    const user = await Storage.get('user');
    if (user) {
      const token = user.access_token;
      headers['Authorization'] = `Bearer ${token}`;
    }

    const { data: result } = await axios({
      method,
      url: url.search('http') === -1 ? `${api.BASE_URL}${url}` : url,
      data,
      params,
      headers
    });

    if (result.type === 'PERMISSION_DENIED') {
      navigate('LogoutScreen');
      console.log(url, result.message);
      ToastAndroid.show(`${result.message}: ${result.route}`, ToastAndroid.SHORT);
      return false;
    } else if (result.type === 'TOKEN_REFRESHED') {
      user.access_token = result.data.token;
      await Storage.set('user', user);
      return await backend(method, url, data, params, headers);
    }

    if (result?.data?.epb) {
      Epb.request(result.data.epb);
    }

    return result;
  } catch (error) {
    console.log('request: ', `${api.BASE_URL}${url}`);
    if (error.response?.status === 503) {
      Features.toast('Service under maintenance', 'info');
      await Storage.remove('user');
      navigate('MaintenanceScreen');
    } else if (error.response?.status === 500) {
      console.log('error backend', error.response.data);
    } else if (error.response?.status === 422) {
      console.log('error backend', JSON.stringify(error.response.data));
      return error.response.data;
    } else if (error.response?.status === 401) {
      await Storage.remove('user');
      Features.toast(error.response.data.message);
      navigate('LogoutScreen');
    } else {
      console.log('error backend', JSON.stringify(error));
    }
    return false;
  }
};

const download = async (url, filename, extension) => {
  try {
    let config = {
      fileCache: true,
      appendExt: extension,
      path: `${ReactNativeBlobUtil.fs.dirs.DownloadDir}/${filename}.${extension}`
    };

    const headers = {};
    const user = await Storage.get('user');
    if (user) {
      const token = user.access_token;
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await ReactNativeBlobUtil.config(config).fetch('GET', `${api.BASE_URL}${url}`, headers);
    return response.path();
  } catch (error) {
    console.log('error Request@download: ' . url, error);
  }
};

const serverTest = async () => {
  const response = await backend('GET', api.BASE_URL + api.CHECK_CONNECTION);
  return response.success;
};

export default {
  backend,
  download,
  serverTest
};
