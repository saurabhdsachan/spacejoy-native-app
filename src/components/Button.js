import { theme } from '@constants/index';
import { elevationShadowStyle } from '@utils/styleHelper';
import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { COLORS, SIZES } = theme;

class Button extends PureComponent {
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
      dashed,
      children,
      loading,
      onPress,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      light && styles.light,
      ghost && styles.ghost,
      shadow && styles.shadow,
      dashed && styles.dashed,
      size && styles[size],
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity activeOpacity={opacity || 0.4} onPress={!loading ? onPress : null}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 1]}
            style={raw ? null : buttonStyles}
            {...props}
            colors={[COLORS.primary1, COLORS.primary2]}
          >
            {loading ? <ActivityIndicator /> : children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={raw ? null : buttonStyles}
        activeOpacity={opacity || 0.4}
        {...props}
        onPress={!loading ? onPress : null}
      >
        {loading ? <ActivityIndicator /> : children}
      </TouchableOpacity>
    );
  }
}

Button.defaultProps = {
  startColor: COLORS.primary1,
  endColor: COLORS.secondary,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  locations: [0.1, 0.9],
  opacity: 0.4,
  color: COLORS.transparent,
  size: 'md',
};

export default Button;

const styles = StyleSheet.create({
  gradientHeight: {
    height: SIZES.width,
    width: SIZES.width,
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
  dashed: { borderStyle: 'dashed', borderWidth: 1 },
  light: {
    borderWidth: 1,
    borderColor: theme.COLORS.white,
  },
  xs: { height: theme.SIZES.base * 4, marginVertical: theme.SIZES.base / 2.5 },
  sm: { height: theme.SIZES.base * 5, marginVertical: theme.SIZES.base / 2 },
  md: { height: theme.SIZES.base * 6, marginVertical: theme.SIZES.base },
  lg: { height: theme.SIZES.base * 7, marginVertical: theme.SIZES.base },
  accent: { backgroundColor: theme.COLORS.accent },
  primary: { backgroundColor: theme.COLORS.primary1 },
  secondary: { backgroundColor: theme.COLORS.secondary },
  tertiary: { backgroundColor: theme.COLORS.tertiary },
  black: { backgroundColor: theme.COLORS.black },
  white: { backgroundColor: theme.COLORS.white },
  gray: { backgroundColor: theme.COLORS.gray },
  gray2: { backgroundColor: theme.COLORS.gray2 },
  gray3: { backgroundColor: theme.COLORS.gray3 },
  gray4: { backgroundColor: theme.COLORS.gray4 },
});
