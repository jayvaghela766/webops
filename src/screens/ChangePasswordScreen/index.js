import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { validate } from 'validate.js';
import MyTextInput from '../../components/MyTextInput';
import User from '../../models/User';
import styles from '../../styles/styles';
import Features from '../../helper/Features';
import validation from './validation.json';
import Spinner from '../../hoc/Spinner';

const ChangePasswordScreen = ({ navigation, route }) => {
  const [form, setForm] = useState({});
  const [errors, setErros] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const save = async () => {
    const errors = validate(form, validation);
    if (errors !== undefined) {
      setErros(errors);
    } else {
      setErros({});
      setIsLoading(true);
      const data = {
        identifier: route.params?.identifier.replace('+', ''),
        email: form.email,
        new_password: form.newPassword,
        confirm_password: form.confirmNewPassword
      };

      const response = await User.resetPassword(data);
      setIsLoading(false);
      Features.toast(response.message, response.success ? 'success' : 'error');
      if (response.success) {
        navigation.navigate('LoginScreen');
      } else {
        Features.toast('Internal server error', 'error');
      }
    }
  };

  return (
    <Spinner isLoading={isLoading} containerStyle={[styles.p20]}>
      <View style={[styles.flex1, styles.alignItemsCenter]}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={style.logo}
        />
      </View>
      <Text style={style.heading}>Forgot Password</Text>
      <View style={[styles.flex3]}>
        <MyTextInput
          label="Registred Email"
          value={form.email}
          onChangeText={(value) => onChange('email', value)}
          errorMessage={errors.email}
          keyboardType="email-address"
        />
        <MyTextInput
          label="New Password"
          value={form.newPassword}
          onChangeText={(value) => onChange('newPassword', value)}
          errorMessage={errors.newPassword}
          password
          togglePasswordVisibility
        />
        <MyTextInput
          label="Confirm New Password"
          value={form.confirmNewPassword}
          onChangeText={(value) => onChange('confirmNewPassword', value)}
          errorMessage={errors.confirmNewPassword}
          password
          togglePasswordVisibility
        />
      </View>
      <TouchableOpacity style={[styles.mt30]} activeOpacity={0.9} onPress={save}>
        <Text style={styles.btnPrimary}>Reset Password</Text>
      </TouchableOpacity>
    </Spinner>
  );
};

const style = StyleSheet.create({
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    marginBottom: 15
  },
  logo: {
    width: 100,
    height: 100
  },
});

export default ChangePasswordScreen;
