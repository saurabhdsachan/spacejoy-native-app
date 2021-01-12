import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
