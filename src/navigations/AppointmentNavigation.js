import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AddAppointmentScreen from '../screens/AddAppointmentScreen';
import MyAppointmentScreen from '../screens/MyAppointmentScreen';

const Stack = createStackNavigator();

const AppointmentNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="MyAppointmentScreen">
    <Stack.Screen
      name="AddAppointmentScreen"
      component={AddAppointmentScreen}
      options={{
        headerShown: false,
        title: '',
      }}
    />
    <Stack.Screen
      name="MyAppointmentScreen"
      component={MyAppointmentScreen}
      options={{
        title: '',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default AppointmentNavigation;
