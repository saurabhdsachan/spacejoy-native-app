import { HeaderBack } from '@components/';
import { theme } from '@constants/index';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from '@screens/Payment/index';
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

const CheckoutStackNavigator = ({ route: { params } }) => (
  <Stack.Navigator>
    <Stack.Screen component={PaymentScreen} name="Payment" options={screenHeaderOptions} initialParams={params} />
  </Stack.Navigator>
);

export default CheckoutStackNavigator;
