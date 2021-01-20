import DrawerNavigator from '@navigation/DrawerNavigator';
import {GoogleSignin} from '@react-native-community/google-signin';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext, useAuthContext} from '@utils/helpers/withAuthContext';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const configureGoogleSign = () =>
  GoogleSignin.configure({
    webClientId:
      '777161788745-q45gphtgoldvv34cu891c43hfv4cv2ik.apps.googleusercontent.com',
    offlineAccess: false,
  });

export default function App() {
  const {authContext} = useAuthContext();
  React.useEffect(() => {
    configureGoogleSign();
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
