import {theme} from '@constants/index';
import {MILD} from '@constants/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LoginError = ({errorText}) => {
  return (
    <>
      {errorText ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: MILD.red,
    padding: theme.SIZES.base,
    textAlign: 'center',
    marginTop: theme.SIZES.base,
  },
  errorText: {
    color: theme.COLORS.red,
    padding: theme.SIZES.base,
    textAlign: 'center',
  },
});

export default LoginError;
