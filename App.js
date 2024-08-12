import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Platform, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import SpInAppUpdates, { NeedsUpdateResponse, IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import IntroNavigation from './src/navigations/IntroNavigation';
import MainDrawerNavigation from './src/navigations/MainDrawerNavigation';
import AuthContext from './src/context/AuthContext';
import colors from './src/config/colors';
import Storage from './src/helper/Storage';
import styles from './src/styles/styles';
import Request from './src/helper/Request';
import api from './src/config/api';
import Features from './src/helper/Features';
import PushNotification from './src/models/PushNotification';
import { isReadyRef, navigate, navigationRef } from './src/navigations/RootNavigation';

const App = () => {
  const inAppUpdates = new SpInAppUpdates(false);
  const [auth, setAuth] = useState(false);
  const [deviceToken, setDeviceToken] = useState();
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [pendingScreen, setPendingScreen] = useState();
  const [needAppUpdate, setNeedAppUpdate] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);

  const authContextValue = {
    auth,
    setAuth,
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    SplashScreen.hide();

    if (Platform.OS == 'android') {
      requestMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.CALL_PHONE
      ]).then((statuses) => {
        const READ_EXTERNAL_STORAGE = statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted';
        const WRITE_EXTERNAL_STORAGE = statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted';
        const CALL_PHONE = statuses[PERMISSIONS.ANDROID.CALL_PHONE] === 'granted';
        if (READ_EXTERNAL_STORAGE && WRITE_EXTERNAL_STORAGE && CALL_PHONE) {
          setPermissionsGranted(true);
        }
      });
    }

    if (Platform.OS === 'ios') {
      setPermissionsGranted(true);
    }

    const foregroundMessaging = messaging().onMessage(async remoteMessage => {
      const { data, notification } = remoteMessage;
      await Features.showNotification(
        notification.title,
        notification.body,
        data
      );
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      const { data } = remoteMessage;
      if (data?.screen) {
        setPendingScreen({
          screen: data.screen,
          params: PushNotification.getParams(data)
        });
      }
    });

    inAppUpdates.checkNeedsUpdate().then((result) => {
      setNeedAppUpdate(result.shouldUpdate);
      if (result.shouldUpdate) {
        let updateOptions= {};
        if (Platform.OS === 'android') {
          updateOptions = {
            updateType: IAUUpdateKind.FLEXIBLE,
          };
        }

        inAppUpdates.addStatusUpdateListener(onStatusUpdate);
        inAppUpdates.startUpdate(updateOptions);
      }
    });

    if (Platform.OS === 'android') {
      createNotificationChannels();
    }

    fetchMessagingToken();
    checkIsLoggedIn();

    return foregroundMessaging;
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      const { notification } = detail;
      switch (type) {
        case EventType.PRESS:
          if (notification.data?.screen) {
            setPendingScreen({
              screen: notification.data.screen,
              params: PushNotification.getParams(notification.data)
            });
          }
      }
    });
  }, []);

  useEffect(() => {
    if (deviceToken && auth?.access_token) {
      updateDeviceToken();
    }
  }, [deviceToken, auth]);

  useEffect(() => {
    if (pendingScreen && isReadyRef) {
      navigate(pendingScreen.screen, pendingScreen.params);
      setPendingScreen();
    }
  }, [isReadyRef, pendingScreen]);

  const fetchMessagingToken = async () => {
    try {
      if (Platform.OS === 'android') {
        const token = await messaging().getToken();
        setDeviceToken(token);
        console.log('token', token);
      } else if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        console.log('Authorization status:', authStatus);
        if (enabled) {
          const token = await messaging().getToken();
          setDeviceToken(token);
          console.log('token', token);
        }
      }
    } catch (e) {
      Features.toast('Can\'t get FCM token', 'warning');
    }
  };

  const updateDeviceToken = async () => {
    await PushNotification.updateDeviceToken(deviceToken);
  };

  const fetchSiteSetting = async () => {
    const settings = await Request.backend('GET', api.GET_SITE_SETTING);
    await Storage.set('siteSettings', settings);
  };

  const checkIsLoggedIn = async () => {
    const user = await Storage.get('user');
    if (user) {
      setAuth(user);
      fetchSiteSetting();
    }
  };

  const createNotificationChannels = async () => {
    try {
      await notifee.createChannel({
        id: 'high-priority',
        name: 'High Priority',
        importance: AndroidImportance.HIGH,
        vibration: true,
        vibrationPattern: [300, 500]
      });
    } catch (error) {
      console.log('createNotificationChannels', error);
    }
  };

  const onStatusUpdate = (status) => {
    const { bytesDownloaded, totalBytesToDownload } = status;
    setUpdateStatus(status);
    if (Number(bytesDownloaded) > 0 && Number(bytesDownloaded) >= Number(totalBytesToDownload)) {
      setNeedAppUpdate(false);
    }
  };

  if (needAppUpdate) {
    return (
      <View style={[styles.flex1, styles.justifyCenter, styles.alignItemsCenter, styles.bgWhite]}>
        <Image source={require('./assets/images/logo.png')} />
        <Text style={[styles.textMuted]}>App Update Required</Text>
        <Text style={[styles.textMuted, styles.f12]}>{`Downloading: ${updateStatus?.bytesDownloaded || 0 }/${updateStatus?.totalBytesToDownload || 0}`}</Text>
      </View>
    )
  }

  if (!permissionsGranted) {
    return (
      <View style={[styles.flex1, styles.justifyCenter, styles.alignItemsCenter, styles.bgWhite]}>
        <Image source={require('./assets/images/logo.png')} />
      </View>
    )
  }

  return (
    <>
      <StatusBar backgroundColor={colors.primary}/>
      <AuthContext.Provider value={authContextValue}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef} onReady={() => isReadyRef.current = true}>
            { auth ? <MainDrawerNavigation auth={auth} /> : <IntroNavigation /> }
          </NavigationContainer>
        </SafeAreaProvider>
        <FlashMessage position="top" />
      </AuthContext.Provider>
    </>
  )
};

export default App;
