// just copy this code from the driving repo :)
import { theme } from '@constants/index';
import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';

const { COLORS, FONTS, SIZES } = theme;

export default class Typography extends PureComponent {
  render() {
    const {
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // spacing
      mb1,
      mb2,
      mb3,
      mb4,
      mt1,
      mt2,
      mt3,
      mt4,
      ml1,
      ml2,
      ml3,
      ml4,
      mr1,
      mr2,
      mr3,
      mr4,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      strike,
      capitalize,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      fontStyle,
      linethrough,
      style,
      children,
      ...props
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      transform && { textTransform: transform },
      align && { textAlign: align },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      mb1 && { marginBottom: SIZES.base / 2 },
      mb2 && { marginBottom: SIZES.base },
      mb3 && { marginBottom: SIZES.base * 2 },
      mb4 && { marginBottom: SIZES.base * 4 },
      mt1 && { marginTop: SIZES.base / 2 },
      mt2 && { marginTop: SIZES.base },
      mt3 && { marginTop: SIZES.base * 2 },
      mt4 && { marginTop: SIZES.base * 4 },
      ml1 && { marginLeft: SIZES.base / 2 },
      ml2 && { marginLeft: SIZES.base },
      ml3 && { marginLeft: SIZES.base * 2 },
      ml4 && { marginLeft: SIZES.base * 4 },
      mr1 && { marginRight: SIZES.base / 2 },
      mr2 && { marginRight: SIZES.base },
      mr3 && { marginRight: SIZES.base * 2 },
      mr4 && { marginRight: SIZES.base * 4 },
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      fontStyle && { fontStyle },
      center && styles.center,
      right && styles.right,
      strike && styles.strike,
      capitalize && styles.capitalize,
      color && styles[color],
      color && !styles[color] && { color },
      // color shortcuts
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      linethrough && styles.linethrough,
      style, // rewrite predefined styles
    ];

    return (
      <Text style={textStyles} {...props}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: SIZES.font,
    color: COLORS.black,
    width: '100%',
  },
  // variations
  regular: {
    fontWeight: 'normal',
    lineHeight: SIZES.font * 1.5,
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '300',
  },
  strike: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  linethrough: {
    textDecorationLine: 'line-through',
  },
  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  // colors
  accent: { color: COLORS.accent },
  primary: { color: COLORS.primary1 },
  secondary: { color: COLORS.secondary },
  tertiary: { color: COLORS.tertiary },
  black: { color: COLORS.black },
  white: { color: COLORS.white },
  gray: { color: COLORS.gray },
  gray2: { color: COLORS.gray2 },
  // fonts
  h1: FONTS.h1,
  h2: FONTS.h2,
  h3: FONTS.h3,
  title: FONTS.title,
  body: FONTS.body,
  caption: FONTS.caption,
  small: FONTS.small,
  // other
});
