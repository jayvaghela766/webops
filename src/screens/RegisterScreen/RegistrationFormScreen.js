import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox';
import validate from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import MyDatePickerInput from '../../components/MyDatePickerInput';
import MyPickerInput from '../../components/MyPickerInput';
import MyChecboxInput from '../../components/MyChecboxInput';
import styles from '../../styles/styles';
import Header from './components/Header';
import colors from '../../config/colors';
import validation from './validation.json';
import AuthContext from '../../context/AuthContext';
import Storage from '../../helper/Storage';
import User from '../../models/User';
import Request from '../../helper/Request';
import api from '../../config/api';
import Features from '../../helper/Features';
import Spinner from '../../hoc/Spinner';
import moment from 'moment';

const RegistrationFormScreen = ({ navigation, route }) => {
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const register = async () => {
    const errors = validate(form, validation.step3);
    if (errors === undefined) {
      setErros({});
      const data = {
        user_type_id: User.USER_TYPE.CUSTOMER,
        name: form.name,
        email: form.email,
        password: form.password,
        confirm_password: form.confirmPassword,
        phone: route.params.form.phoneNumber.match(/\d+/g).join(''),
        gender: form.gender,
        birthday: moment(form.birthday).format('YYYY-MM-DD'),
        referral: form.referral,
        marketing_email: form.isAgreePromotion,
        marketing_sms: form.isAgreePromotion
      };

      setIsLoading(true);
      const response = await User.store(data);
      let message = response.message;
      if (message) {
        const errors = response?.errors;
        const keys = Object.keys(errors);
        message = keys.length ? errors[keys[0]].join(',')  : message;
      }

      Features.toast(message, response.success ? 'success' : 'error');
      if (response.success) {
        const loginData = {
          email: form.email,
          password: form.password
        };


        const loginResponse = await Request.backend('POST', api.LOGIN, loginData);
        if (loginResponse.success) {
          await Storage.set('user', loginResponse.data);
          setAuth(loginResponse.data);
        }
      }
      setIsLoading(false);
    } else {
      setErros(errors)
    }
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={[styles.flex1, styles.ph20]}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Header
          stepNumber="3"
          logoContainer={{ width: 100, height: 80 }}
          headerContainer={{ justifyContent: 'flex-start', flex: 0, marginTop: 20 }}
        />
        <View style={[styles.flex1, { paddingBottom: 20 }]}>
          <MyTextInput
            label="Email"
            onChangeText={(value) => onChange('email', value)}
            value={form.email}
            errorMessage={errors.email}
            keyboardType="email-address"
          />
          <MyTextInput
            label="Full Name"
            onChangeText={(value) => onChange('name', value)}
            value={form.name}
            errorMessage={errors.name}
          />
          <MyPickerInput
            label="Gender"
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            containerStyle={[styles.mb20]}
            onValueChange={(value) => onChange('gender', value)}
            value={form.gender}
            errorMessage={errors.gender}
          />
          <MyDatePickerInput
            label="Birthday"
            onChangeValue={(value) => onChange('birthday', value)}
            errorMessage={errors.birthday}
            value={form.birthday}
          />
          <MyTextInput
            label="Password"
            onChangeText={(value) => onChange('password', value)}
            value={form.password}
            errorMessage={errors.password}
            password
            togglePasswordVisibility
          />
          <MyTextInput
            label="Confirm Password"
            onChangeText={(value) => onChange('confirmPassword', value)}
            value={form.confirmPassword}
            errorMessage={errors.confirmPassword}
            password
            togglePasswordVisibility
          />
          <MyTextInput
            label="Referral Code"
            onChangeText={(value) => onChange('referral', value)}
            value={form.referral}
            errorMessage={errors.referral}
          />
          <View style={[styles.row, styles.alignItemsCenter, !errors.isAgreeTerm ? styles.mb10 : {}, Platform.OS === 'ios' ? styles.ml5 : {}]}>
            <CheckBox
              value={form.isAgreeTerm}
              onValueChange={(value) => onChange('isAgreeTerm', value)}
              tintColors={[colors.primary]}
            />
            <View style={[styles.row, styles.flex1, { flexWrap: 'wrap' }, Platform.OS === 'ios' ? styles.pl5 : {}]}>
              <Text style={style.term}>By signing up, you agree to W OPTICS</Text>
              <Text style={[style.termLink, Platform.OS === 'ios' ? styles.ml0 : {}]} onPress={() => navigation.navigate('TermsAndConditionScreen')}>{'Terms and Conditions'}</Text>
              <Text style={style.term}>and the</Text>
              <Text style={[style.termLink]} onPress={() => navigation.navigate('PrivacyPolicyScreen')}>Privacy Policy.</Text>
            </View>
          </View>
          { errors.isAgreeTerm && <Text style={[style.errorMessage, styles.mb10]}>{errors.isAgreeTerm}</Text> }
          <View style={[styles.row, styles.alignItemsCenter, Platform.OS === 'ios' ? styles.ml5 : {}]}>
            <CheckBox
              value={form.isAgreePromotion}
              onValueChange={(value) => onChange('isAgreePromotion', value)}
              tintColors={[colors.primary]}
            />
            <View style={[styles.row, styles.flex1, { flexWrap: 'wrap' }, Platform.OS === 'ios' ? styles.pl5 : {}]}>
              <Text style={style.term}>I accept all marketing promotions and also subscribe to the newsletter.</Text>
            </View>
          </View>
          { errors.isAgreePromotion && <Text style={[style.errorMessage]}>{errors.isAgreePromotion}</Text> }
          <TouchableOpacity style={[styles.mt20]} activeOpacity={0.9} onPress={register}>
            <Text style={[styles.btnPrimary, styles.bold]}>Register</Text>
          </TouchableOpacity>
          <View style={[styles.row, styles.justifyCenter, styles.mt10]}>
            <Text style={[styles.normal, styles.f12, styles.mr5]}>Already have an account?</Text>
            <TouchableOpacity style={style.loginLink} activeOpacity={0.9} onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={[styles.normal, styles.f12, styles.textPrimary]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Spinner>
  );
};

const style = StyleSheet.create({
  inputLabel: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginBottom: 10
  },
  otpContainer: {
    height: 50
  },
  loginLink: {
    borderBottomColor: colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  term: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12
  },
  termLink: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.primary,
    marginHorizontal: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.primary
  },
  errorMessage: {
    color: colors.red,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10
  }
})

export default RegistrationFormScreen;