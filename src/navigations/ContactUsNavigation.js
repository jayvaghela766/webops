import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ContactUsScreen from '../screens/ContactUsScreen';

const Stack = createStackNavigator();

const ContactUsNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      cardStyle: {
        backgroundColor: '#fff',
      },
    }}
    initialRouteName="ContactUsScreen"
  >
    <Stack.Screen
      name="ContactUsScreen"
      component={ContactUsScreen}
      options={{
        headerShown: false,
        title: 'Contact Us',
      }}
    />
  </Stack.Navigator>
);

export default ContactUsNavigation;
