import React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../../config/api';
import Storage from '../../helper/Storage';
import styles from '../../styles/styles';

const PaymentProcessingScreen = ({ navigation, route }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onNavigationStateChange = async (state) => {
    if (state.url.includes(api.WEB_BASE_URL)) {
      const data = route.params.data;
      const orderCode = data?.code || null;
      if (data?.code) {
        const promotionCode = await Storage.get('promotionCode');
        if (promotionCode) {
          await Storage.remove('promotionCode');
        }
      }

      navigation.navigate('HomeScreen', {
        orderCode,
        isRequestAppoinment: data?.is_request_appointment || false
      });
    }
  };

  return (
    <View style={[styles.flex1, styles.bgWhite]}>
      { !isLoaded && <Text>Please wait</Text> }
      {
        route.params?.uri && (
          <WebView
            source={{ uri: route.params?.uri }}
            onLoadEnd={() => setIsLoaded(true)}
            onNavigationStateChange={onNavigationStateChange}
          />
        )
      }
    </View>
  )
};

export default PaymentProcessingScreen;