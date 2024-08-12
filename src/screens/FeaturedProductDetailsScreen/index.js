import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from '../../styles/styles';

const FeaturedProductDetailsScreen = ({navigation, route}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SafeAreaView style={[styles.flex1, styles.bgWhite]}>
      {!isLoaded && <Text>Please wait </Text>}
      <WebView
        source={{uri: `${route?.params?.product.url}`}}
        onLoadEnd={() => setIsLoaded(true)}
      />
    </SafeAreaView>
  );
};

export default FeaturedProductDetailsScreen;
