import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const RegistrationNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="SettingScreen"
  >
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{
        title: '',
      }}
    />
  </Stack.Navigator>
);

export default RegistrationNavigation;
