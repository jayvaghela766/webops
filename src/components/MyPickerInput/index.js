import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import styles from '../../styles/styles';
import colors from '../../config/colors';

const MyPickerInput = ({ label, value, data, placeholder, onValueChange, required, containerStyle, errorMessage }) => (
  <View style={containerStyle}>
    <View style={styles.row}>
      { label && <Text style={[styles.mb10, errorMessage ? styles.textRed : { color: 'black' }]}>{label}</Text> }
      { required && <Text style={[style.label, styles.textRed]}>{' *'}</Text> }
    </View>
    <View style={[style.picker, errorMessage ? { borderColor: 'red' } : {}]}>
      {
        Platform.OS === 'android'
        ? (
          <Picker selectedValue={value} onValueChange={onValueChange}>
            <Picker.Item label={placeholder} value="" style={{ color: '#dadada' }} />
            { data.map(({ label, value }) => <Picker.Item label={label} value={value} key={`picker-${value}`} />) }
          </Picker>
        )
        : (
          <View style={[styles.p10]}>
            <RNPickerSelect
              items={data}
              onValueChange={onValueChange}
              value={value}
              placeholder={{ label: placeholder, value: '' }}
            />
          </View>
        )
      }
    </View>
    { errorMessage && <Text style={[style.errorMessage]}>{errorMessage}</Text> }
  </View>
);

const style = StyleSheet.create({
  picker: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 5,
    paddingVertical: Platform.OS === 'ios' ? 8 : 0
  },
  label: {
    fontFamily: 'OpenSans-Regular',
    marginBottom: 5,
  },
  errorMessage: {
    color: colors.red,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  }
});

MyPickerInput.defaultProps = {
  value: '',
  placeholder: 'Select One',
  onValueChange: () => null,
  data: []
};

export default MyPickerInput;