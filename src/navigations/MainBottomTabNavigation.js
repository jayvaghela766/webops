import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import ShopScreen from '../screens/ShopScreen';
import AppointmentNavigation from './AppointmentNavigation';
import PromotionWalletScreen from '../screens/PromotionWalletScreen';
import MainDrawerNavigation from './MainDrawerNavigation';
import HomeStackNavigation from './EshopStackNavigation';

const Tab = createMaterialBottomTabNavigator();

const MainBottomTabNavigation = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#333',
      inactiveTintColor: '#333',
    }}
    shifting={false}
    barStyle={{
      backgroundColor: '#fff',
    }}>
    <Tab.Screen
      name="HomeScreen"
      component={MainDrawerNavigation}
      options={{
        title: 'Home',
      }}
    />
    <Tab.Screen
      name="ShopScreen"
      component={HomeStackNavigation}
      options={{
        title: 'E-Shop',
      }}
    />
    <Tab.Screen
      name="MyAppointmentScreen"
      component={AppointmentNavigation}
      options={{
        title: 'Appointments',
      }}
    />
    <Tab.Screen
      name="PromotionWalletScreen"
      component={PromotionWalletScreen}
      options={{
        title: 'E-Wallet',
      }}
    />
  </Tab.Navigator>
);

export default MainBottomTabNavigation;
