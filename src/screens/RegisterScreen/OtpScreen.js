import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import validate from 'validate.js';
import Request from '../../helper/Request';
import styles from '../../styles/styles';
import Header from './components/Header';
import validation from './validation.json';
import api from '../../config/api';
import Features from '../../helper/Features';
import Spinner from '../../hoc/Spinner';

const OtpScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState('');
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (otp.length === 4) {
      next();
    }
  }, [otp]);

  const next = async () => {
    const errors = validate({ otp }, validation.step2);
    if (errors === undefined) {
      setErros({});
      const data = {
        phone_number: route.params.phoneNumber.match(/\d+/g).join(''),
        code: otp
      };

      setIsLoading(true);
      const response = await Request.backend('POST', api.OTP_VERIFY, data);
      setIsLoading(false);

      if (response.success) {
        navigation.navigate('RegistrationFormScreen', {
          form: {
            phoneNumber: route.params.phoneNumber,
            otp
          }
        });
      } else {
        Features.toast(response.message, 'error');
      }
    } else {
      setErros(errors)
    }
  };

  return (
    <Spinner containerStyle={[styles.flex1, styles.p20]} isLoading={isLoading}>
      <KeyboardAwareScrollView>
        <Header stepNumber="2" />
        <Text style={style.inputLabel}>One-Time Password</Text>
        <Text style={style.sublabel}>Key in your four digit pin number</Text>
        <OTPInputView
          style={style.otpContainer}
          pinCount={4}
          autoFocusOnLoad
          onCodeChanged={setOtp}
          codeInputFieldStyle={style.otpText}
          keyboardType="number-pad"
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
    fontSize: 16,
  },
  sublabel: {
    fontFamily: 'OpenSans-Italic',
    fontWeight: '400',
    marginBottom: 10
  },
  otpContainer: {
    height: 50
  },
  otpText: {
    fontFamily: 'OpenSans-Bold',
    color: '#333'
  }
})

export default OtpScreen;