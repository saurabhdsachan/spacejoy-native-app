import { theme } from '@constants/index';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = ({ style, ...props }) => <View style={[styles.divider, style]} {...props} />;

export default Divider;

export const styles = StyleSheet.create({
  divider: {
    height: 0,
    borderBottomColor: theme.COLORS.gray2,
    borderBottomWidth: 1,
  },
});
