import React, {useMemo, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN': {
      const {token, data} = action;
      return {
        ...prevState,
        userToken: token,
        isLoading: false,
        userData: data ? JSON.parse(data) : {},
      };
    }
    case 'SIGN_IN': {
      const {token, data} = action;
      return {
        ...prevState,
        isSignout: false,
        userToken: token,
        userData: data,
      };
    }
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
        userData: {},
      };
  }
};

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  token: null,
  userData: {},
};

const useAuthContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userData;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          userData = await AsyncStorage.getItem('userData');
        }
      } catch (e) {
        // Restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken, data: userData});
    };
    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async ({data, token}) => {
        // save user token to async storage
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          await AsyncStorage.setItem('userToken', token);
          dispatch({type: 'SIGN_IN', token: token, data});
        } catch (e) {
          // failure to save async storage items
          console.log('an error occurred', e.message);
        }
      },
      token: state.userToken,
      data: state.userData,
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userData');
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          // failure to clear async storage
        }
        dispatch({type: 'SIGN_OUT'});
      },
      signUp: async ({data, token}) => {
        // save user token to async storage
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          await AsyncStorage.setItem('userToken', token);
        } catch (e) {
          // failure to save async storage items
        }
        dispatch({type: 'SIGN_IN', token: token, data});
      },
    }),
    [state.userToken, state.userData],
  );
  return {
    authContext,
  };
};

export {AuthContext, useAuthContext};
