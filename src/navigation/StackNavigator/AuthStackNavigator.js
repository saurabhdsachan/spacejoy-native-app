import HeaderBack from '@components/index';
import { theme } from '@constants/index';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/Auth/Login';
import SignUp from '@screens/Auth/SignUp';
import React from 'react';

const Stack = createStackNavigator();
const { SIZES, COLORS } = theme;
const screen = {
  title: null,
  headerTransparent: true,
  headerBackImage: () => <HeaderBack />,
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    color: COLORS.black,
  },
};
const screenOptions = {
  headerShown: false,
};
const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen component={Login} name="Login" options={screen} />
      <Stack.Screen component={SignUp} name="SignUp" options={screen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
