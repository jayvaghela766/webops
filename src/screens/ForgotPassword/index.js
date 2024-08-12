import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from '../../styles/styles';
import Request from '../../helper/Request';
import api from '../../config/api';
import Spinner from '../../hoc/Spinner';
import colors from '../../config/colors';
import Features from '../../helper/Features';

const ForgotPassword = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('');
  const [hasSent, setHasSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (otp.length === 4) {
      verifyOtp();
    }
  }, [otp]);

  const send = async () => {
    if (!identifier.trim().length) {
      Features.toast('Please type phone number or your email');
      return;
    }

    setIsLoading(true);
    const key = identifier.indexOf('@') !== -1 ? 'email' : 'phone_number';
    const response = await Request.backend('POST', api.OTP, { [key]: identifier });
    if (response.success) {
      setHasSent(response.success);
    }

    if (response.message) {
      Features.toast(response.message, 'warning');
    }

    setIsLoading(false);
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const key = identifier.indexOf('@') !== -1 ? 'email' : 'phone_number';
    const data = {
      [key]: identifier,
      code: otp
    };
    const response = await Request.backend('POST', api.OTP_VERIFY, data);
    setIsLoading(false);
    if (response.success) {
      navigation.navigate('ChangePasswordScreen', { identifier })
    }

    if (response.message) {
      Features.toast(response.message, 'warning');
    }
  };

  return (
    <Spinner containerStyle={[styles.flex1, styles.p20]} isLoading={isLoading}>
      <View style={[styles.flex1, styles.alignItemsCenter]}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={style.logo}
        />
      </View>
      <Text style={style.heading}>Forgot Password</Text>
      <View style={[styles.flex3]}>
        <KeyboardAwareScrollView>
          <Text style={style.inputLabel}>Enter your mobile number or email to get OTP</Text>
          <View style={[styles.row, styles.alignItemsStart, styles.mb20]}>
            <View style={[styles.flex1]}>
              <TextInput
                placeholder="Enter mobile number/email"
                style={style.textInput}
                value={identifier}
                onChangeText={setIdentifier}
              />
              { hasSent && <Text style={style.errorMessage}>The OTP has been sent to your mobile number/email, the code will be valid for 1 minute.</Text> }
            </View>
            <TouchableOpacity
              activeOpacity={0.9} style={[style.sendButton, hasSent ? { backgroundColor: '#c4c4c4' } : {}]}
              onPress={send}
              disabled={hasSent}
            >
              <Text style={style.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
          {
            hasSent && (
              <View>
                <Text style={[styles.regular, styles.f16, styles.mb5]}>One-Time Password</Text>
                <Text style={[styles.italic, styles.f14, styles.mb5]}>Key in your four digit pin number.</Text>
                <OTPInputView
                  pinCount={4}
                  style={style.otpContainer}
                  autoFocusOnLoad
                  onCodeChanged={setOtp}
                  codeInputFieldStyle={style.otpText}
                  keyboardType="number-pad"
                />
                <TouchableOpacity activeOpacity={0.9} onPress={send}>
                  <Text style={[styles.italic, styles.f14, styles.mt5, styles.underline]}>Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )
          }
        </KeyboardAwareScrollView>
      </View>
    </Spinner>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    marginBottom: 15
  },
  inputLabel: {
    fontFamily: 'OpenSans-Italic',
    fontWeight: "400",
    fontSize: 14,
    marginBottom: 10
  },
  textInput: {
    borderColor: '#C4C4C4',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 10 : 15,
    fontFamily: 'OpenSans-Regular',
    color: '#333'
  },
  sendButton: {
    backgroundColor: colors.primary,
    marginLeft: 10,
    paddingVertical: 15,
    borderRadius: 5,
    paddingHorizontal: 20
  },
  sendButtonText: {
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
  errorMessage: {
    fontFamily: 'OpenSans-Italic',
    color: 'red'
  },
  logo: {
    width: 100,
    height: 100
  },
  otpContainer: {
    height: 50,
    width: '60%'
  },
  otpText: {
    fontFamily: 'OpenSans-Bold',
    color: '#333'
  }
})

export default ForgotPassword;