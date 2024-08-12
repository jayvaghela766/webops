import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import validate from 'validate.js';
import styles from '../../styles/styles';
import MyTextInput from '../../components/MyTextInput';
import Header from './components/Header';
import validation from './validation.json';
import Request from '../../helper/Request';
import api from '../../config/api';
import Spinner from '../../hoc/Spinner';
import Features from '../../helper/Features';

const RegisterScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const next = async () => {
    const errors = validate({ phoneNumber }, validation.step1);
    if (errors === undefined) {
      setErros({});

      setIsLoading(true);
      const response = await Request.backend('POST', api.OTP, {
        phone_number: phoneNumber.match(/\d+/g).join('')
      });
      setIsLoading(false);

      if (!response.success) {
        Features.toast('Unable to sent the OTP', 'error');
        return;
      }

      navigation.navigate('OtpScreen', { phoneNumber });
    } else {
      setErros(errors)
    }
  };

  return (
    <Spinner containerStyle={[styles.flex1, styles.p20]} isLoading={isLoading}>
      <KeyboardAwareScrollView>
        <Header stepNumber="1" />
        <Text style={style.inputLabel}>Mobile Number</Text>
        <Text style={[style.sublabel]}>An OTP will be sent to your mobile number.</Text>
        <MyTextInput
          maskedType="custom"
          maskOptions={{
            mask: '9999-9999-9999'
          }}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          errorMessage={errors.phoneNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={[styles.mt20]} activeOpacity={0.9} onPress={next}>
          <Text style={styles.btnPrimary}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Spinner>
  );
};

const style = StyleSheet.create({
  inputLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16
  },
  sublabel: {
    fontFamily: 'OpenSans-Italic',
    fontWeight: '400',
    marginBottom: 10
  }
})

export default RegisterScreen;