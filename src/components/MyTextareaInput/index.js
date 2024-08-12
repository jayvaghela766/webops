import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import colors from '../../config/colors';
import styles from '../../styles/styles';

const MyTextareaInput = ({
  containerStyle,
  onChangeText,
  value,
  label,
  required,
  placeholder,
  errorMessage
}) => {

  return (
    <View style={[styles.mb20, containerStyle]}>
      <View style={styles.row}>
        { label && <Text style={[style.textInputLabel, errorMessage ? styles.textRed : { color: 'black' }]}>{label}</Text> }
        { required && <Text style={[style.label, styles.textRed]}>{' *'}</Text> }
      </View>
      <View style={[style.textInputContainer, label ? styles.mt5 : {}, errorMessage ? { borderColor: colors.red } : {}]}>
        <View style={[styles.rowBetweenInCenter]}>
          <TextInput
              style={style.textInput}
              placeholder={placeholder}
              placeholderTextColor="#C8C7CC"
              onChangeText={onChangeText}
              value={value}
              multiline
              numberOfLines={10}
            />
        </View>
      </View>
      { errorMessage && <Text style={[style.errorMessage]}>{errorMessage}</Text> }
    </View>
  );
};

const style = StyleSheet.create({
  textInputContainer: {
    borderColor: '#C4C4C4',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS == 'ios' ? 15 : 5,
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    color: '#000',
    height: 100,
    textAlignVertical: 'top'
  },
  textInputLabel: {
    fontFamily: 'OpenSans-Regular'
  },
  passwordVisibility: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: colors.primary
  },
  errorMessage: {
    color: colors.red,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  }
});

export default MyTextareaInput;