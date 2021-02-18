import { HeaderBack } from '@components/';
import { theme } from '@constants/index';
import { createStackNavigator } from '@react-navigation/stack';
import AuthEntryPoint from '@screens/Auth/AuthWrapper';
import React from 'react';

const Stack = createStackNavigator();
const { COLORS } = theme;
const screenHeaderOptions = {
  title: null,
  headerTransparent: true,
  headerBackImage: () => <HeaderBack />,
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    color: COLORS.black,
  },
};

const AuthStackNavigator = ({ route: { params } }) => (
  <Stack.Navigator mode="modal">
    <Stack.Screen
      component={AuthEntryPoint}
      name={params.screen}
      options={screenHeaderOptions}
      initialParams={params}
      mode="modal"
    />
  </Stack.Navigator>
);

export default AuthStackNavigator;
