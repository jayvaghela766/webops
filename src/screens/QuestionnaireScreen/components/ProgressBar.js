import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import styles from '../../../styles/styles';

const ProgressBar = ({ length, currentIndex }) => (
  <View style={[styles.row]}>
    {
      Array.from(Array(length).keys()).map((_, i) => (
        <View key={`ProgressBar-${i}`} style={[style.bar, i !== length - 1 ? styles.mr15 : {}, i <= currentIndex ? style.active : {} ]} />
      ))
    }
  </View>
);

const style = StyleSheet.create({
  bar: {
    flex: 1,
    backgroundColor: '#D5E2E9',
    height: 8,
    borderRadius: 8,
  },
  active: {
    backgroundColor: colors.primary
  }
});

export default ProgressBar;
