import React, { useLayoutEffect, useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Spinner from '../../hoc/Spinner';
import MyTextInput from '../../components/MyTextInput';
import AuthContext from '../../context/AuthContext';
import colors from '../../config/colors';
import styles from '../../styles/styles';
import Features from '../../helper/Features';
import Storage from '../../helper/Storage';
import Request from '../../helper/Request';
import api from '../../config/api';

const LoginScreen = ({ navigation }) => {
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={[styles.link, styles.f14, styles.mr15]}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onChange = (key, value) => {
    const input = { ...form };
    input[key] = value;
    setForm(input);
  };

  const onLogin = async () => {
    setLoading(true);
    form.username = form.email;
    const response = await Request.backend('POST', api.LOGIN, form);
    if (!response.success) {
      setLoading(false);
      if (response?.message) {
        Features.toast(response.message, 'danger');
      }
    } else {
      await Storage.set('user', response.data);
      setLoading(false);
      setAuth(response.data);
    }
  };

  return (
    <Spinner isLoading={loading} containerStyle={[styles.p20]}>
      <View style={[styles.flex1, styles.alignItemsCenter]}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={style.logo}
        />
      </View>
      <View style={[styles.flex3]}>
        <MyTextInput
          label="Email"
          placeholder=""
          onChangeText={(value) => onChange('email', value)}
          value={form.email}
          keyboardType="email-address"
        />
        <View>
          <MyTextInput
            label="Password"
            togglePasswordVisibility
            containerStyle={styles.mb0}
            onChangeText={(value) => onChange('password', value)}
            value={form.password}
            password
          />
          <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={style.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.flex1, styles.row]}>
        <TouchableOpacity style={[styles.button, styles.bgPrimary, styles.flex1]} activeOpacity={0.9} onPress={onLogin}>
          <Text style={[styles.textWhite, styles.buttonLabel]}>Login</Text>
        </TouchableOpacity>
      </View>
    </Spinner>
  );
};

const style = StyleSheet.create({
  forgotPassword: {
    fontFamily: 'OpenSans-Italic',
    fontWeight: "400",
    fontSize: 12,
    color: colors.primary,
    marginTop: 5
  },
  logo: {
    width: 100,
    height: 81
  }
});

export default LoginScreen;