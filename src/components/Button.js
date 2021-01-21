import {theme} from '@constants/index';
import {elevationShadowStyle} from '@utils/styleHelper';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {COLORS, SIZES} = theme;

class Button extends Component {
  render() {
    const {
      raw,
      light,
      ghost,
      size,
      style,
      opacity,
      color,
      gradient,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      light && styles.light,
      ghost && styles.ghost,
      shadow && styles.shadow,
      size && styles[size],
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && {backgroundColor: color}, // custom backgroundColor
      style,
    ];

    return (
      <TouchableOpacity
        style={raw ? null : buttonStyles}
        activeOpacity={opacity || 0.6}
        {...props}>
        {gradient && (
          <LinearGradient
            style={styles.rotate}
            colors={[COLORS.primary2, COLORS.primary1]}
          />
        )}
        {children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: COLORS.primary1,
  endColor: COLORS.secondary,
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.8,
  color: COLORS.transparent,
  size: 'md',
};

export default Button;

const styles = StyleSheet.create({
  rotate: {
    zIndex: -1,
    position: 'absolute',
    height: SIZES.width,
    width: SIZES.width,
    transform: [{rotate: '135deg'}],
  },
  button: {
    overflow: 'hidden',
    backgroundColor: theme.COLORS.teal,
    borderRadius: theme.SIZES.radius * 2,
    justifyContent: 'center',
    paddingHorizontal: theme.SIZES.padding,
  },
  shadow: {
    ...elevationShadowStyle(2),
  },
  ghost: {
    borderWidth: 1,
    borderColor: theme.COLORS.gray,
  },
  light: {
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  xs: {height: theme.SIZES.base * 4, marginVertical: theme.SIZES.base / 2.5},
  sm: {height: theme.SIZES.base * 5, marginVertical: theme.SIZES.base / 2},
  md: {height: theme.SIZES.base * 6, marginVertical: theme.SIZES.base},
  lg: {height: theme.SIZES.base * 7, marginVertical: theme.SIZES.base},
  accent: {backgroundColor: theme.COLORS.accent},
  primary: {backgroundColor: theme.COLORS.primary1},
  secondary: {backgroundColor: theme.COLORS.secondary},
  tertiary: {backgroundColor: theme.COLORS.tertiary},
  black: {backgroundColor: theme.COLORS.black},
  white: {backgroundColor: theme.COLORS.white},
  gray: {backgroundColor: theme.COLORS.gray},
  gray2: {backgroundColor: theme.COLORS.gray2},
  gray3: {backgroundColor: theme.COLORS.gray3},
  gray4: {backgroundColor: theme.COLORS.gray4},
});
