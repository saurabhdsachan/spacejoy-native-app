import { HeaderBack } from '@components/index';
import { createStackNavigator } from '@react-navigation/stack';
import Ideabook from '@screens/Ideabook';
import IdeabookDetailedView from '@screens/IdeabookDetailedView';
import React from 'react';

const Stack = createStackNavigator();

const ScreenHeaderOptions = {
  headerBackImage: () => <HeaderBack />,
  headerTransparent: false,
  headerBackTitleVisible: false,
  headerTitleAlign: 'left',
  title: null,
  headerStyle: {
    backgroundColor: 'white',
    borderBottomColor: 'white',
  },
};

const IdeabookStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ideabook"
        component={Ideabook}
        options={{ ...ScreenHeaderOptions, headerTransparent: true }}
      />
      <Stack.Screen
        screenOptions={{ headerShown: false }}
        name="IdeabookDetailedView"
        component={IdeabookDetailedView}
        options={{ ...ScreenHeaderOptions, headerTransparent: true }}
      />
    </Stack.Navigator>
  );
};

export default IdeabookStackNavigator;
