import React, { useMemo, useReducer } from 'react';

const AuthNavigationContext = React.createContext();

const initialState = {
  defaultNavigationTo: 'Home',
  redirectUrl: '',
  redirectRouteData: {},
  currentRoute: '',
  callback: () => {},
};
const reducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_AUTH_FLOW_CONTEXT': {
      const {
        payload: { callback, redirectUrl, currentRoute, redirectRouteData },
      } = action;
      return {
        ...prevState,
        callback,
        redirectUrl,
        currentRoute,
        redirectRouteData,
      };
    }
    case 'RESET_AUTH_FLOW_CONTEXT': {
      return {
        ...initialState,
      };
    }
  }
};

const AuthNavState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authNavState = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );
  return {
    authNavState,
  };
};

export { AuthNavigationContext, AuthNavState };
