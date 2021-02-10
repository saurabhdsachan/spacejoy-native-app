import { HeaderBack, HeaderLeft, HeaderRight } from '@components/index';
import { createStackNavigator } from '@react-navigation/stack';
import Browser from '@screens/Browser';
import Details from '@screens/Details';
import Home from '@screens/Home';
import Ideabook from '@screens/Ideabook';
import IdeabookDetailedView from '@screens/IdeabookDetailedView';
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
        name="Ideabook"
        component={Ideabook}
        options={{ headerTransparent: true, headerLeft: () => <></>, headerRight: () => <HeaderRight /> }}
      />
      <Stack.Screen
        name="IdeabookDetailedView"
        component={IdeabookDetailedView}
        options={{ headerRight: () => <HeaderRight /> }}
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
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={{
          headerTransparent: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
