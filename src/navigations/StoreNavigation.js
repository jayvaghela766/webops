import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StoreLocatorScreen from '../screens/StoreLocatorScreen';

const Stack = createStackNavigator();

const StoreNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="StoreNavigation"
  >
    <Stack.Screen
      name="StoreLocatorScreen"
      component={StoreLocatorScreen}
      options={{
        title: 'Store Locator',
      }}
    />
  </Stack.Navigator>
);

export default StoreNavigation;
