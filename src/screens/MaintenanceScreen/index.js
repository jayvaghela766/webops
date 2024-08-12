import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const MaintenanceScreen = () => (
  <View style={style.container}>
    <Image
      source={require('../../../assets/images/logo.png')}
      style={style.logo}
    />
    <Text style={[styles.normal, styles.dark]}>Mobile App Under Maintenance</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 160,
    height: 160,
  }
});

export default MaintenanceScreen;