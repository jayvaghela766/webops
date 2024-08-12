import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from '../../styles/styles';
import colors from '../../config/colors';

const MyCheckboxInput = ({ label, value, onValueChange, containerStyle }) => (
  <View style={[style.container, containerStyle]}>
    <CheckBox
      value={value}
      onValueChange={onValueChange}
      tintColors={colors.primary}
    />
    {
      typeof label === 'string'
       ? <Text style={[style.label, Platform.OS === 'ios' ? styles.ml10 : {}]}>{label}</Text>
       : label
    }
  </View>
);

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
  },
});

export default MyCheckboxInput;