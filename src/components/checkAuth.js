import { Block } from '@components/index';
import { theme } from '@constants/index';
import { AuthContext } from '@utils/helpers/withAuthContext';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const { COLORS } = theme;

const checkAuth = (navigateToScreen) => ({ ...props }) => {
  useEffect(() => {
    const { token } = React.useContext(AuthContext);
    const { navigation } = props;
    if (!token) {
      navigation.navigate('Auth', { screen: 'Login', params: { navigateToScreen } });
    } else {
      navigation.navigate(navigateToScreen);
    }
  }, [props]);
  return (
    <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
      <ActivityIndicator size="small" />
    </Block>
  );
};

export default checkAuth;
