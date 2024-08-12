import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import SettingScreen from '../screens/SettingScreen';
import SettingMarketingScreen from '../screens/SettingMarketingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import DataProtectionPolicyScreen from '../screens/DataProtectionPolicyScreen';
import ReturnPolicyScreen from '../screens/ReturnPolicyScreen';
import styles from '../styles/styles';

const Stack = createStackNavigator();

const SettingNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="SettingScreen"
  >
    <Stack.Screen
      name="SettingScreen"
      component={SettingScreen}
      options={{
        headerShown: false,
        title: 'Settings',
      }}
    />
    <Stack.Screen
      name="SettingMarketingScreen"
      component={SettingMarketingScreen}
      options={({ navigation }) => ({
        title: 'Settings',
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
      name="DataProtectionPolicyScreen"
      component={DataProtectionPolicyScreen}
      options={({ navigation }) => ({
        title: 'Data Protection Policy',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="ReturnPolicyScreen"
      component={ReturnPolicyScreen}
      options={({ navigation }) => ({
        title: 'Return Policy',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
  </Stack.Navigator>
);

export default SettingNavigation;
