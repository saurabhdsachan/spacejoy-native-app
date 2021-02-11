import { createStackNavigator } from '@react-navigation/stack';
import Login from '@screens/Auth/ModalLogin';
import SignUp from '@screens/Auth/ModalSignup';
import AuthNavigationContext from '@utils/helpers/AuthNavigationContext';
import React, { useReducer } from 'react';

const AuthStack = createStackNavigator();
const screenOptions = {
  headerShown: false,
  headerTintColor: 'black',
  // cardStyle: { backgroundColor: 'transparent' },
};

const initialState = {
  defaultNavigationTo: 'Home',
};
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD_REDIRECT_ROUTE': {
      const { payload } = action;
      const { redirectRouteData, redirectUrl = '', currentRoute } = payload;
      return {
        ...prevState,
        redirectUrl,
        currentRoute,
        ...(redirectRouteData && { redirectRouteData }),
      };
    }
  }
  return {
    ...prevState,
  };
};

const AuthModalStackNavigator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthNavigationContext.Provider value={{ state, dispatch }}>
      <AuthStack.Navigator
        screenOptions={screenOptions}
        mode="modal"
        options={{ cardStyle: { backgroundColor: 'transparent' } }}
      >
        <AuthStack.Screen component={Login} name="Login" options={{ cardStyle: { backgroundColor: 'transparent' } }} />
        <AuthStack.Screen
          component={SignUp}
          name="SignUp"
          options={{ cardStyle: { backgroundColor: 'transparent' } }}
        />
      </AuthStack.Navigator>
    </AuthNavigationContext.Provider>
  );
};

export default AuthModalStackNavigator;
