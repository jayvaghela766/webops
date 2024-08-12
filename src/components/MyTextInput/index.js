import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import colors from '../../config/colors';
import styles from '../../styles/styles';

const MyTextInput = ({
  containerStyle,
  onChangeText,
  value,
  label,
  required,
  placeholder,
  password,
  togglePasswordVisibility,
  keyboardType,
  errorMessage,
  maskedType,
  maskOptions
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(password);

  return (
    <View style={[styles.mb20, containerStyle]}>
      <View style={styles.row}>
        { label && <Text style={[style.textInputLabel, errorMessage ? styles.textRed : { color: 'black' }]}>{label}</Text> }
        { required && <Text style={[style.label, styles.textRed]}>{' *'}</Text> }
      </View>
      <View style={[style.textInputContainer, label ? styles.mt5 : {}, errorMessage ? { borderColor: colors.red } : {}]}>
        <View style={[styles.rowBetweenInCenter]}>
          {
            maskedType
            ? (
              <TextInputMask
                removeClippedSubviews={false}
                type={maskedType}
                value={value}
                onChangeText={onChangeText}
                style={style.textInput}
                options={maskOptions}
                placeholder={placeholder}
                keyboardType={keyboardType}
              />
            )
            : (
              <>
                <TextInput
                  style={style.textInput}
                  placeholder={placeholder}
                  placeholderTextColor="#C8C7CC"
                  secureTextEntry={secureTextEntry}
                  onChangeText={onChangeText}
                  value={value}
                  keyboardType={keyboardType}
                />
                {
                  togglePasswordVisibility && (
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => setSecureTextEntry((prev) => !prev)}
                    >
                      <Text style={style.passwordVisibility}>{ secureTextEntry ? 'Show' : 'Hide'}</Text>
                    </TouchableOpacity>
                  )
                }
              </>
            )
          }
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
    paddingVertical: Platform.OS == 'ios' ? 15 : 0
  },
  textInput: {
    fontFamily: 'OpenSans-Regular',
    flex: 1,
    color: '#000'
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

MyTextInput.defaultProps = {
  keyboardType: 'default'
};

export default MyTextInput;