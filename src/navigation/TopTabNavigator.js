import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Collection from '@screens/Collection';
import MyDesigns from '@screens/MyDesigns';
import React from 'react';

const Tab = createMaterialTopTabNavigator();

function CollectionTopTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen name="Collection" component={Collection} />
      <Tab.Screen name="MyDesigns" component={MyDesigns} />
    </Tab.Navigator>
  );
}

export default CollectionTopTabNavigator;
