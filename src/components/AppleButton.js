import {theme} from '@constants/index';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import React from 'react';
import {StyleSheet} from 'react-native';

const AppleSignin = ({handleSigninError, handleSignInSuccess, ...props}) => {
  const onAppleButtonPress = async () => {
    props.onTap ? props.onTap() : () => {};
    try {
      // make sign in request and return a response object containing authentication data
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // retrieve identityToken from sign in request
      const {
        identityToken,
        authorizationCode,
        user,
        fullName,
        email,
      } = appleAuthRequestResponse;
      // identityToken generated
      if (identityToken && authorizationCode) {
        const userObj = {
          data: {
            name: `${fullName.givenName || ''} ${fullName.familyName || ''}`,
            email,
            id: user,
            channel: 'apple',
          },
        };
        handleSignInSuccess(userObj, identityToken, authorizationCode);
      } else {
        // no token, failed sign in
        handleSigninError('Error while signing in.');
      }
    } catch (error) {
      // handle error
      handleSigninError(error.message);
    }
  };
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButton}
      onPress={() => onAppleButtonPress()}
    />
  );
};

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
    ...{height: theme.SIZES.base * 5},
    marginVertical: 15,
    borderWidth: 1,
    borderColor: theme.COLORS.gray,
    borderRadius: theme.SIZES.base / 2,
  },
});

export default AppleSignin;
