import {createStackNavigator} from '@react-navigation/stack';
import Login from '@screens/Auth/Login';
import SignUp from '@screens/Auth/SignUp';
import React from 'react';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  headerTintColor: 'black',
  headerBackTitle: 'Back',
};

const AuthStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={Login} name="SignIn" options={{title: ''}} />
      <Stack.Screen component={SignUp} name="SignUp" options={{title: ''}} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
