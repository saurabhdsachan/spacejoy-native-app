import DrawerNavigator from '@navigation/DrawerNavigator';
import { AuthModalStackNavigator } from '@navigation/StackNavigator';
import { GoogleSignin } from '@react-native-community/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, useAuthContext } from '@utils/helpers/withAuthContext';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const configureGoogleSign = () =>
  GoogleSignin.configure({
    webClientId: '777161788745-q45gphtgoldvv34cu891c43hfv4cv2ik.apps.googleusercontent.com',
    offlineAccess: false,
  });

const screenOptions = {
  headerShown: false,
  headerTintColor: 'black',
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator headerMode="false" initialRouteName="DrawerContent" screenOptions={screenOptions} mode="modal">
      <RootStack.Screen name="DrawerContent" component={DrawerNavigator} />
      <RootStack.Screen
        name="ModalAuth"
        component={AuthModalStackNavigator}
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
        mode="modal"
      />
    </RootStack.Navigator>
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
