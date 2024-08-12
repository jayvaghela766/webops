import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import MyAccountScreen from '../screens/MyAccountScreen';
import PersonalDetailScreen from '../screens/PersonalDetailScreen';
import UpdatePersonalDetailsScreen from '../screens/UpdatePersonalDetailsScreen';
import UpdatePasswordScreen from '../screens/UpdatePasswordScreen';
import AddressScreen from '../screens/AddressScreen';
import EditAddressScreen from '../screens/EditAddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AddPaymentScreen from '../screens/AddPaymentScreen';
import styles from '../styles/styles';

const Stack = createStackNavigator();

const MyAccountNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="PersonalDetailScreen"
  >
    <Stack.Screen
      name="MyAccountScreen"
      component={MyAccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PersonalDetailScreen"
      component={PersonalDetailScreen}
      options={({ navigation }) => ({
        title: 'Personal Details',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        ),
        headerShown: false
      })}
    />
    <Stack.Screen
      name="UpdatePersonalDetailsScreen"
      component={UpdatePersonalDetailsScreen}
      options={({ navigation }) => ({
        title: 'Account',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="UpdatePasswordScreen"
      component={UpdatePasswordScreen}
      options={({ navigation }) => ({
        title: 'Account',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="AddressScreen"
      component={AddressScreen}
      options={({ navigation }) => ({
        title: 'Address Book',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="AddAddressScreen"
      component={AddAddressScreen}
      options={({ navigation }) => ({
        title: 'Account',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="EditAddressScreen"
      component={EditAddressScreen}
      options={({ navigation }) => ({
        title: 'Account',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="PaymentScreen"
      component={PaymentScreen}
      options={({ navigation }) => ({
        title: 'Payment Details',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="AddPaymentScreen"
      component={AddPaymentScreen}
      options={({ navigation }) => ({
        title: 'Add Payment',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
  </Stack.Navigator>
);

export default MyAccountNavigation;
