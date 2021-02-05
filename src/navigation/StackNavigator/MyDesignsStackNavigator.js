import { createStackNavigator } from '@react-navigation/stack';
import MyDesigns from '@screens/MyDesigns';
import React from 'react';

const Stack = createStackNavigator();

const MyDesignsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyDesigns" component={MyDesigns} />
    </Stack.Navigator>
  );
};

export default MyDesignsStackNavigator;
