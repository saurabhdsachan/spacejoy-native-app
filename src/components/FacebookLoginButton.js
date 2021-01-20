import React from 'react';
import {
  fbLoginWrapper,
  getInfoFromToken,
} from '@utils/SocialLogins/FbLoginHelpers';
import {StyleSheet} from 'react-native';
import Button from '@components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '@constants/index';

const FacebookLoginButton = ({
  handleSigninError,
  handleSignInSuccess,
  ...props
}) => {
  const login = () => {
    props.onTap ? props.onTap() : () => {};
    fbLoginWrapper()
      .then(async (data) => {
        try {
          const userData = await getInfoFromToken(data);
          handleSignInSuccess(userData, userData.token);
        } catch (e) {
          handleSigninError('Something went wrong while fetching user details');
        }
      })
      .catch((e) => {
        handleSigninError(e.message);
      });
  };
  return (
    <Button
      size="md"
      ghost
      style={styles.actionBtnStyles}
      onPress={login}
      {...props}>
      <Icon color="#3b5998" name="logo-facebook" size={18} />
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

export default FacebookLoginButton;
