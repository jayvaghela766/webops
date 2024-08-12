import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PromotionalWalletScreen from '../screens/PromotionWalletScreen';
import PromotionDetailScreen from '../screens/PromotionDetailScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

const PromotionWalletNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="PromotionalWalletScreen"
  >
    <Stack.Screen
      name="PromotionalWalletScreen"
      component={PromotionalWalletScreen}
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

export default PromotionWalletNavigation;
