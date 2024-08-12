import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotionDetailScreen from '../screens/PromotionDetailScreen';
import colors from '../config/colors';
import PromotionalScreen from '../screens/PromotionScreen';

const Stack = createStackNavigator();

const PromotionNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="PromotionalScreen"
  >
    <Stack.Screen
      name="PromotionalScreen"
      component={PromotionalScreen}
      options={{
        title: '',
        headerShown: false
      }}
    />
    <Stack.Screen
      name="PromotionDetailScreen"
      component={PromotionDetailScreen}
      options={{
        title: '',
        headerStyle: {
          backgroundColor: colors.primary
        },
        cardStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: '#fff',
        headerShown: false
      }}
    />
  </Stack.Navigator>
);

export default PromotionNavigation;
