import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import MainNavigationHeader from '../../components/MainNavigationHeader';
import api from '../../config/api';
import Features from '../../helper/Features';
import styles from '../../styles/styles';

const LiveChatScreen = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      Features.toast('To start chat please tap on the icon below', 'info');
    }
  }, [isLoaded]);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      <MainNavigationHeader navigation={navigation} />
      { !isLoaded && <Text>Please wait</Text> }
      <WebView
        source={{ uri: `${api.WEB_BASE_URL}/live-chat` }}
        onLoadEnd={() => setIsLoaded(true)}
      />
    </SafeAreaView>
  )
};

export default LiveChatScreen;