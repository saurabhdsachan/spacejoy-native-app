import React from 'react';
import {StyleSheet} from 'react-native';
import Button from '@components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import GSignIn from '@utils/SocialLogins/GoogleLoginHelpers';
import {theme} from '@constants/index';

const GoogleLoginButton = ({
  handleSigninError,
  handleSignInSuccess,
  ...props
}) => {
  const signInWithGoogle = async () => {
    props.onTap ? props.onTap() : () => {};
    try {
      const userData = await GSignIn();
      handleSignInSuccess(userData, userData.token);
    } catch (e) {
      handleSigninError(e.message);
    }
  };
  return (
    <Button
      size="md"
      ghost
      style={styles.actionBtnStyles}
      onPress={signInWithGoogle}
      {...props}>
      <Icon color="#de5246" name="logo-google" size={18} />
    </Button>
  );
};

const styles = StyleSheet.create({
  actionBtnStyles: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: theme.SIZES.base / 2,
  },
});
export default GoogleLoginButton;
