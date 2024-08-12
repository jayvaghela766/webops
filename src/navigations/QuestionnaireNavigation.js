import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionnaireScreen from '../screens/QuestionnaireScreen';
import ProductRecommendation from '../screens/ProductRecommendation';

const Stack = createStackNavigator();

const QuestionnaireNavigation = () => (
  <Stack.Navigator
    initialRouteName="QuestionnaireScreen"
  >
    <Stack.Screen
      name="QuestionnaireScreen"
      component={QuestionnaireScreen}
      options={{
        title: '',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProductRecommendation"
      component={ProductRecommendation}
      options={{
        title: '',
        headerShown: false,
        cardStyle: {
          backgroundColor: '#F4F7FF'
        }
      }}
    />
  </Stack.Navigator>
);

export default QuestionnaireNavigation;