import { theme } from '@constants/index';
import { elevationShadowStyle } from '@utils/styleHelper';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Block from './Block';

const styles = StyleSheet.create({
  card: {
    ...elevationShadowStyle(2),
    borderRadius: theme.SIZES.radius,
  },
});

const Card = ({ color, style, children, ...props }) => {
  const cardStyles = { ...styles.card, ...(style || {}) };
  return (
    <TouchableOpacity activeOpacity={0.8} {...props}>
      <Block color={color || theme.COLORS.white} style={cardStyles}>
        {children}
      </Block>
    </TouchableOpacity>
  );
};
export default Card;
