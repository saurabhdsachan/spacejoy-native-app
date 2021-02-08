import { theme } from '@constants/index';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colorMap } from './fetchers';

const { SIZES, COLORS } = theme;
const Indicator = ({ measureMents, scrollX, data, size, spacerWidth }) => {
  console.log(measureMents);
  const inputRange = data.map((_, i) => i * (size - spacerWidth));
  const indicatorWidth = scrollX?.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.width),
  });
  const indicatorTop = scrollX?.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.y),
  });
  const translateX = scrollX?.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.x),
  });
  const indicatorHeight = scrollX?.interpolate({
    inputRange,
    outputRange: measureMents.map((measure) => measure.height),
  });
  const borderColor = scrollX?.interpolate({
    inputRange,
    outputRange: [colorMap.delight.dark, colorMap.bliss.dark, colorMap.euphoria.dark],
  });
  return (
    <>
      {scrollX ? (
        <Animated.View
          style={{
            backgroundColor: 'transparent',
            // padding: SIZES.base,
            borderWidth: 1,
            borderColor,
            width: indicatorWidth,
            height: indicatorHeight,
            position: 'absolute',
            borderRadius: SIZES.radius,
            left: 0,
            zIndex: 1,
            top: indicatorTop,
            transform: [
              {
                translateX,
              },
            ],
          }}
        />
      ) : null}
    </>
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
