import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import HomeStackNavigation from './EshopStackNavigation';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import {TouchableOpacity} from 'react-native';
import AddAppointmentScreen from '../screens/AddAppointmentScreen';
import styles from '../styles/styles';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import AddAppointmentForOtherScreen from '../screens/AddAppointmentForOtherScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createStackNavigator();

const HomeNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        headerShown: false,
        title: '',
      }}
    />
    <Stack.Screen
      name="ServiceDetailScreen"
      component={ServiceDetailScreen}
      options={({navigation}) => ({
        title: 'Services',
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
      name="ProductDetailScreen"
      component={ProductDetailScreen}
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
      name="AddAppointmentScreen"
      component={AddAppointmentScreen}
      options={{
        headerShown: false,
        title: '',
      }}
    />
    <Stack.Screen
      name="AppointmentDetailScreen"
      component={AppointmentDetailScreen}
      options={({navigation}) => ({
        title: 'Appointment Details',
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
      name="AddAppointmentForOtherScreen"
      component={AddAppointmentForOtherScreen}
      options={({navigation}) => ({
        title: 'Book for Others',
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
      name="ArticleDetailScreen"
      component={ArticleDetailScreen}
      options={{
        headerShown: false,
        title: '',
      }}
    />
    <Stack.Screen
      name="HomeStackScreen"
      component={HomeStackNavigation}
      options={{
        headerShown: false,
        title: '',
      }}
    />
  </Stack.Navigator>
);

export default HomeNavigation;
