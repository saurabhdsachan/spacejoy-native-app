import { HeaderBack } from '@components/';
import { theme } from '@constants/index';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from '@screens/Payment/index';
import SuccessScreen from '@screens/Success';
import React from 'react';

const Stack = createStackNavigator();
const { COLORS } = theme;
const screenHeaderOptions = {
  title: 'Secure Checkout',
  headerBackImage: () => <HeaderBack />,
  cardStyle: { backgroundColor: 'transparent' },
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    color: COLORS.black,
  },
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
};

const CheckoutStackNavigator = ({ route: { params } }) => (
  <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen component={PaymentScreen} name="Payment" options={screenHeaderOptions} initialParams={params} />
    <Stack.Screen
      component={SuccessScreen}
      name="PaymentSuccess"
      options={{ ...screenHeaderOptions, headerShown: false }}
      mode="modal"
    />
  </Stack.Navigator>
);

export default CheckoutStackNavigator;
