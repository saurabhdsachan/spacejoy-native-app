import { HeaderBack, HeaderLeft, HeaderRight } from '@components/index';
import { createStackNavigator } from '@react-navigation/stack';
import Details from '@screens/Details';
import Home from '@screens/Home';
import Profile from '@screens/Profile';
import React from 'react';

const Stack = createStackNavigator();

const screenOptionStyle = {
  title: null,
  headerTintColor: 'black',
  headerBackTitleVisible: false,
  headerBackImage: () => <HeaderBack />,
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
};

const HomeStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <HeaderLeft navigation={navigation} hasLogo />,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerRight: () => <HeaderRight />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTransparent: true,
          headerRight: () => <HeaderRight />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
