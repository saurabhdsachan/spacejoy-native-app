import {Block, Button, HeaderBack} from '@components/index';
import {images, SIZES} from '@constants/index';
import {createStackNavigator} from '@react-navigation/stack';
import DesignService from '@screens/DesignService';
import Details from '@screens/Details';
import Home from '@screens/Home';
import MyDesigns from '@screens/MyDesigns';
import NewAction from '@screens/NewAction';
import Quiz1 from '@screens/PreQuiz/Quiz1';
import Store from '@screens/Store';
import React from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CollectionTopTabNavigator from './TopTabNavigator';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'white',
    shadowColor: 'transparent',
  },
  headerTintColor: 'black',
  headerBackTitle: 'Back',
};

const HomeStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: null,
          headerLeft: () => (
            <Block center row>
              <Button raw onPress={navigation.toggleDrawer}>
                <Icon
                  name="ios-reorder-two-outline"
                  size={25}
                  style={{marginHorizontal: SIZES.padding}}
                />
              </Button>
              <Image
                source={images.logo}
                resizeMode="cover"
                style={{
                  height: 25,
                  width: 108,
                  marginRight: SIZES.base,
                }}
              />
            </Block>
          ),
          headerRight: () => (
            <Block center row>
              <Button raw onPress={navigation.toggleDrawer}>
                <Icon
                  name="cart-outline"
                  size={20}
                  style={{marginHorizontal: SIZES.padding}}
                />
              </Button>
            </Block>
          ),
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: null,
          headerBackImage: () => <HeaderBack />,
        }}
      />
    </Stack.Navigator>
  );
};

const CollectionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Collection" component={CollectionTopTabNavigator} />
    </Stack.Navigator>
  );
};
const NewActionStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewAction"
        component={NewAction}
        options={{headerShown: false, title: null}}
      />
      <Stack.Screen
        name="DesignService"
        component={DesignService}
        options={{
          headerTransparent: true,
          title: null,
          headerBackImage: () => <HeaderBack />,
          headerBackTitleStyle: {
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="Quiz1"
        component={Quiz1}
        options={{
          headerTransparent: true,
          title: null,
          headerBackImage: () => <HeaderBack />,
          headerBackTitleStyle: {
            color: 'black',
          },
        }}
      />
    </Stack.Navigator>
  );
};
const MyDesignsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyDesigns" component={MyDesigns} />
    </Stack.Navigator>
  );
};
const StoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  );
};

export {
  HomeStackNavigator,
  CollectionStackNavigator,
  MyDesignsStackNavigator,
  NewActionStackNavigator,
  StoreStackNavigator,
};
