import { Block } from '@components/index';
import Login from '@screens/Auth/Login';
import React from 'react';
import SignUp from './SignUp';

const AuthScreenRenderer = ({ flow, ...props }) => {
  return <>{flow === 'login' ? <Login {...props} /> : <SignUp {...props} />}</>;
};

const LoginWrapper = ({ navigation, route }) => {
  const {
    params: { layout, flow },
  } = route;
  console.log(layout);
  return (
    <>
      {layout !== 'modal' ? (
        <AuthScreenRenderer flow={flow} navigation={navigation} route={route} layout={layout} />
      ) : (
        <Block>
          <Block flex={1} />
          <Block flex={4}>
            <AuthScreenRenderer flow={flow} navigation={navigation} route={route} layout={layout} />
          </Block>
        </Block>
      )}
    </>
  );
};

export default LoginWrapper;
