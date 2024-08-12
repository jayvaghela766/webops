import { ToastAndroid, Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import notifee, { AndroidImportance } from '@notifee/react-native';

const toast = (message, type = 'success') => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else if (Platform.OS === 'ios') {
    showMessage({
      message,
      type
    });
  }
};

const showNotification = async (title, body, data) => {
  try {
    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: 'high-priority',
        smallIcon: 'ic_notification',
        importance: AndroidImportance.HIGH,
        vibrationPattern: [300, 500],
        sound: 'default'
      },
      data
    });
  } catch (error) {
    console.log('error Features@showNotification', error);
  }
}

export default {
  toast,
  showNotification
};
