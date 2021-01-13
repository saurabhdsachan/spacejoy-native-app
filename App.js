import DrawerNavigator from '@navigation/DrawerNavigator';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
