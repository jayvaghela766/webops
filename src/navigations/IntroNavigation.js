import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import LoginScreen from '../screens/LoginScreen';
import IntroScreen from '../screens/IntroScreen';
import IntroLoginScreen from '../screens/IntroLoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OtpScreen from '../screens/RegisterScreen/OtpScreen';
import RegistrationFormScreen from '../screens/RegisterScreen/RegistrationFormScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import styles from '../styles/styles';

const Stack = createStackNavigator();

const IntroNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff'
      }
    }}
  >
    <Stack.Screen
      name="IntroScreen"
      component={IntroScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="IntroLoginScreen"
      component={IntroLoginScreen}
      options={{
        headerShown: false,
        title: ''
      }}
    />
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="OtpScreen"
      component={OtpScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="RegistrationFormScreen"
      component={RegistrationFormScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPassword}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="ChangePasswordScreen"
      component={ChangePasswordScreen}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="PrivacyPolicyScreen"
      component={PrivacyPolicyScreen}
      options={({ navigation }) => ({
        title: 'Privacy Policy',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="TermsAndConditionScreen"
      component={TermsAndConditionScreen}
      options={({ navigation }) => ({
        title: 'Terms and Conditions',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="MaintenanceScreen"
      component={MaintenanceScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default IntroNavigation;
