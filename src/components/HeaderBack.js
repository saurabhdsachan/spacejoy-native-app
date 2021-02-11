import { COLORS, SIZES } from '@constants/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';

const HeaderBack = () => (
  <Button size="xs" color={COLORS.white} style={styles.style}>
    <Icon name="arrow-back" size={20} style={styles.icon} />
  </Button>
);

const styles = StyleSheet.create({
  style: {
    marginHorizontal: SIZES.padding,
    height: SIZES.base * 5,
    width: SIZES.base * 5,
    borderRadius: SIZES.radius * 0.75,
  },
  icon: {
    position: 'absolute',
    height: SIZES.base * 2,
    width: SIZES.base * 2,
    top: SIZES.base * 1.25,
    left: SIZES.base * 1.25,
  },
});

export default React.memo(HeaderBack);
