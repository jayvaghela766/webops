import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import MyOrderScreen from '../screens/MyOrderScreen/alt';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import RefundRequestScreen from '../screens/RefundRequestScreen';
import styles from '../styles/styles';
import TrackOrderScreen from '../screens/TrackOrderScreen';

const Stack = createStackNavigator();

const MyOrderNavigation = () => (
  <Stack.Navigator
    initialRouteName="MyOrderScreen"
  >
    <Stack.Screen
      name="MyOrderScreen"
      component={MyOrderScreen}
      options={{
        headerShown: false,
        title: 'Orders',
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <Stack.Screen
      name="OrderDetailScreen"
      component={OrderDetailScreen}
      options={({ navigation }) => ({
        title: 'Orders',
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="RefundRequestScreen"
      component={RefundRequestScreen}
      options={({ navigation }) => ({
        title: 'Orders',
        cardStyle: {
          backgroundColor: '#fff'
        },
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
    <Stack.Screen
      name="TrackOrderScreen"
      component={TrackOrderScreen}
      options={({ navigation }) => ({
        title: 'Orders',
        cardStyle: {
          backgroundColor: '#fff'
        },
        headerLeft: () => (
          <TouchableOpacity activeOpacity={0.9} style={[styles.ml20]} onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )
      })}
    />
  </Stack.Navigator>
);

export default MyOrderNavigation;
