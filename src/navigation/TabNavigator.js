import { theme } from '@constants/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Host } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  CollectionStackNavigator,
  HomeStackNavigator,
  MyDesignsStackNavigator,
  NewActionStackNavigator,
  StoreStackNavigator
} from './StackNavigator';

const { COLORS, SIZES } = theme;

const Tab = createBottomTabNavigator();

const TabBarLabels = {
  Home: 'Home',
  Collection: 'Collections',
  NewAction: 'New Project',
};

const BottomTabNavigator = () => {
  return (
    <Host>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Collection') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'NewAction') {
              iconName = focused ? 'add-circle-sharp' : 'add-sharp';
            } else if (route.name === 'My Designs') {
              iconName = focused ? 'images' : 'images-outline';
            } else if (route.name === 'Store') {
              iconName = focused ? 'basket' : 'basket-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={route.name === 'NewAction' ? size * 1.1 : size / 1.15} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: COLORS.red,
          inactiveTintColor: COLORS.black,
          tabStyle: { marginVertical: SIZES.base / 2.25 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: TabBarLabels.Home,
          }}
        />
        <Tab.Screen
          name="Collection"
          component={CollectionStackNavigator}
          options={{
            tabBarLabel: TabBarLabels.Collection,
          }}
        />
        <Tab.Screen
          name="NewAction"
          component={NewActionStackNavigator}
          options={{
            tabBarLabel: TabBarLabels.NewAction,
          }}
        />
        <Tab.Screen name="My Designs" component={MyDesignsStackNavigator} />
        <Tab.Screen name="Store" component={StoreStackNavigator} />
      </Tab.Navigator>
    </Host>
  );
};

export default BottomTabNavigator;
