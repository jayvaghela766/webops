import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../../styles/styles';

const Header = ({ title, totalStep, currentStep }) => (
  <View style={[styles.row, styles.justifySpaceBetween, styles.alignItemsCenter, styles.mb10]}>
    <Text style={[styles.bold, styles.f20]}>{title}</Text>
    <Text style={[styles.regular, styles.f16]}>{`${currentStep}/${totalStep}`}</Text>
  </View>
);

export default Header;
