import {createStackNavigator} from '@react-navigation/stack';
import Store from '@screens/Store';
import React from 'react';

const Stack = createStackNavigator();

const StoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  );
};

export default StoreStackNavigator;
