import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '@screens/SignIn';
import SignUp from '@screens/SignUp';
import React from 'react';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  headerTintColor: 'black',
  headerBackTitle: 'Back',
};

const AuthStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        component={SignInScreen}
        name="SignIn"
        options={{title: ''}}
      />
      <Stack.Screen component={SignUp} name="SignUp" options={{title: ''}} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
