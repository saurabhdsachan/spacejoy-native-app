import {createDrawerNavigator} from '@react-navigation/drawer';
import WalkThrough from '@screens/WalkThrough';
import {AuthContext} from '@utils/helpers/withAuthContext';
import React from 'react';
import {DrawerContent} from '../components/DrawerContent';
import AuthStackNavigator from './AuthStackNavigator';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const {token} = React.useContext(AuthContext);
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="WalkThrough" component={WalkThrough} />
      {token ? (
        <Drawer.Screen name="Home" component={TabNavigator} />
      ) : (
        <Drawer.Screen name="Home" component={AuthStackNavigator} />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
