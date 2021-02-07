import { theme } from '@constants/index';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colorMap } from './fetchers';

const { SIZES } = theme;

const Indicator = ({ measureMents, scrollX, data, size, spacerWidth }) => {
  console.log(measureMents);
  const inputRange = data.map((_, i) => i * (size - spacerWidth));
  const width = scrollX.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.width),
  });
  const top = scrollX.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.y),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.x),
  });
  const height = scrollX.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.height),
  });
  const borderColor = scrollX.interpolate({
    inputRange,
    outputRange: [colorMap.delight.dark, colorMap.bliss.dark, colorMap.euphoria.dark],
  });
  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          borderColor,
          width,
          height,
          top,
          transform: [
            {
              translateX,
            },
          ],
        },
      ]}
    />
  );
};

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: 'transparent',
    position: 'absolute',
    borderWidth: 1,
    borderRadius: SIZES.radius,

    left: 0,
    zIndex: 1,
  },
});
