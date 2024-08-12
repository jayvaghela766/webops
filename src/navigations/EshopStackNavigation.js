import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import MyAppointmentScreen from '../screens/MyAppointmentScreen';
import CartScreen from '../screens/CartScreen';
import ShippingScreen from '../screens/ShippingScreen';
import ProductScreen from '../screens/ProductScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ShopScreen from '../screens/ShopScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import DataProtectionPolicyScreen from '../screens/DataProtectionPolicyScreen';
import styles from '../styles/styles';
import ReturnPolicyScreen from '../screens/ReturnPolicyScreen';
import PaymentProcessingScreen from '../screens/PaymentProcessingScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';

const Stack = createStackNavigator();

const EshopStackNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="ShopScreen">
    <>
      <Stack.Screen
        name="ShopScreen"
        component={ShopScreen}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({navigation}) => ({
          title: 'E-Shop',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ShippingScreen"
        component={ShippingScreen}
        options={({navigation}) => ({
          title: 'E-Shop',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="MyAppointmentScreen"
        component={MyAppointmentScreen}
        options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={({navigation}) => ({
          title: 'Privacy Policy',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TermsAndConditionScreen"
        component={TermsAndConditionScreen}
        options={({navigation}) => ({
          title: 'Terms and Conditions',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="DataProtectionPolicyScreen"
        component={DataProtectionPolicyScreen}
        options={({navigation}) => ({
          title: 'Data Protection Policy',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ReturnPolicyScreen"
        component={ReturnPolicyScreen}
        options={({navigation}) => ({
          title: 'Return Policy',
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.ml20]}
              onPress={() => navigation.goBack()}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentProcessingScreen"
        component={PaymentProcessingScreen}
        options={({navigation}) => ({
          title: 'Payment',
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name="MaintenanceScreen"
        component={MaintenanceScreen}
        options={{
          headerShown: false,
        }}
      />
    </>
  </Stack.Navigator>
);

export default EshopStackNavigation;
