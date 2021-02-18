import DrawerNavigator from '@navigation/DrawerNavigator';
import { AuthStackNavigator, CheckoutStackNavigator } from '@navigation/StackNavigator';
import { GoogleSignin } from '@react-native-community/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigationContext, AuthNavState } from '@utils/helpers/AuthNavigationContext';
import { AuthContext, useAuthContext } from '@utils/helpers/withAuthContext';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-view';

const configureGoogleSign = () =>
  GoogleSignin.configure({
    webClientId: '777161788745-q45gphtgoldvv34cu891c43hfv4cv2ik.apps.googleusercontent.com',
    offlineAccess: false,
  });

const screenOptions = {
  headerShown: false,
  headerTintColor: 'black',
};
const modalScreenOptions = {
  cardStyle: { backgroundColor: 'rgba(0,0,0,0.6)' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
  cardOverlayEnabled: false,
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const { authNavState } = AuthNavState();
  return (
    <AuthNavigationContext.Provider value={authNavState}>
      <RootStack.Navigator
        headerMode="false"
        initialRouteName="DrawerContent"
        screenOptions={screenOptions}
        mode="modal"
      >
        <RootStack.Screen name="DrawerContent" component={DrawerNavigator} />
        <RootStack.Screen name="Auth" component={AuthStackNavigator} options={modalScreenOptions} mode="modal" />
        <RootStack.Screen name="Checkout" component={CheckoutStackNavigator} />
      </RootStack.Navigator>
    </AuthNavigationContext.Provider>
  );
};

export default function App() {
  const { authContext } = useAuthContext();
  React.useEffect(() => {
    configureGoogleSign();
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
