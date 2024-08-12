import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../styles/styles';

const TextInputValue = ({ label, value, required, containerStyle }) => (
  <View style={[containerStyle]}>
    <View style={[styles.row]}>
      <Text style={style.label}>{label}</Text>
      { required && <Text style={[style.label, styles.textRed]}>{' *'}</Text> }
    </View>
    <Text style={style.value}>{value}</Text>
  </View>
);

const style = StyleSheet.create({
  label: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
  },
  value: {
    fontFamily: 'OpenSans-Bold',
  },
});

export default TextInputValue;
