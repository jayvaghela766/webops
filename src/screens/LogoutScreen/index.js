import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import Storage from '../../helper/Storage';
import AuthContext from '../../context/AuthContext';
import PushNotification from '../../models/PushNotification';

const LogoutScreen = () => {
  const { setAuth } = useContext(AuthContext);

  useEffect(async () => {
    await PushNotification.deleteDeviceId();
    Storage.remove('user');
    setAuth(false);
  }, []);

  return (
    <View />
  );
};

export default LogoutScreen;