import { SIZES } from '@constants/';
import Login from '@screens/Auth/Login';
import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import SignUp from './SignUp';

const AuthScreenRenderer = ({ flow, ...props }) => {
  return <>{flow === 'login' ? <Login {...props} /> : <SignUp {...props} />}</>;
};

const AuthWrapper = ({ navigation, route }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef?.current?.open();
  }, []);
  const {
    params: { layout, flow },
  } = route;

  const redirectUser = () => {
    navigation.goBack();
  };
  return (
    <>
      {layout !== 'modal' ? (
        <AuthScreenRenderer flow={flow} navigation={navigation} route={route} layout={layout} />
      ) : (
        <Modalize
          ref={modalRef}
          modalTopOffset={SIZES.height * 0.1}
          onClosed={redirectUser}
          overlayStyle={{ backgroundColor: 'transparent' }}
        >
          <AuthScreenRenderer flow={flow} navigation={navigation} route={route} layout={layout} />
        </Modalize>
      )}
    </>
  );
};

export default AuthWrapper;
