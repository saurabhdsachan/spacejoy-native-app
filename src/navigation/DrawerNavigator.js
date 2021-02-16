import DrawerContent from '@components/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WalkThrough from '@screens/WalkThrough';
import React from 'react';
import { AuthStackNavigator } from './StackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="WalkThrough" component={WalkThrough} options={{ swipeEnabled: false }} />
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Auth" component={AuthStackNavigator} options={{ swipeEnabled: false }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
