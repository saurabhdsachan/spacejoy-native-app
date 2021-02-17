import { COLORS, SIZES } from '@constants/index';
import { elevationShadowStyle } from '@utils/styleHelper';
import React from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
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
}) => {
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
          {...props}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 1]}
          style={raw ? style : buttonStyles}
          colors={[COLORS.primary1, COLORS.primary2]}
        >
          {loading ? <ActivityIndicator /> : children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      {...props}
      style={raw ? style : buttonStyles}
      activeOpacity={opacity || 0.4}
      onPress={!loading ? onPress : null}
    >
      {loading ? <ActivityIndicator /> : children}
    </TouchableOpacity>
  );
};

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

export default React.memo(Button);

const styles = StyleSheet.create({
  gradientHeight: {
    height: SIZES.width,
    width: SIZES.width,
  },
  button: {
    overflow: 'hidden',
    backgroundColor: COLORS.teal,
    borderRadius: SIZES.radius * 2,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
  shadow: {
    ...elevationShadowStyle(2),
  },
  ghost: {
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  dashed: { borderStyle: 'dashed', borderWidth: 1 },
  light: {
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  xs: { height: SIZES.base * 4, marginVertical: SIZES.base / 2.5 },
  sm: { height: SIZES.base * 5, marginVertical: SIZES.base / 2 },
  md: { height: SIZES.base * 6, marginVertical: SIZES.base },
  lg: { height: SIZES.base * 7, marginVertical: SIZES.base },
  accent: { backgroundColor: COLORS.accent },
  primary: { backgroundColor: COLORS.primary1 },
  secondary: { backgroundColor: COLORS.secondary },
  tertiary: { backgroundColor: COLORS.tertiary },
  black: { backgroundColor: COLORS.black },
  white: { backgroundColor: COLORS.white },
  gray: { backgroundColor: COLORS.gray },
  gray2: { backgroundColor: COLORS.gray2 },
  gray3: { backgroundColor: COLORS.gray3 },
  gray4: { backgroundColor: COLORS.gray4 },
});
