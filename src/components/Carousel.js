import { images, theme } from '@constants/index';
import React, { useRef } from 'react';
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';
import Block from './Block';
import ProgressiveImage from './ProgressiveImage';

const { COLORS, SIZES } = theme;

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Block style={styles.scrollContainer}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        >
          {data?.map((image, imageIndex) => {
            return (
              <ProgressiveImage
                resizeMode="cover"
                key={imageIndex}
                thumbnailSource={images.pattern}
                source={{
                  uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_${
                    SIZES.width * 2
                  }/${image}`,
                }}
                style={{ width: SIZES.width, height: 250 }}
              />
            );
          })}
        </Animated.ScrollView>
        <View style={styles.indicatorContainer}>
          {data?.map((image, imageIndex) => {
            const opacity = scrollX.interpolate({
              inputRange: [SIZES.width * (imageIndex - 1), SIZES.width * imageIndex, SIZES.width * (imageIndex + 1)],
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            const scaleX = scrollX.interpolate({
              inputRange: [SIZES.width * (imageIndex - 1), SIZES.width * imageIndex, SIZES.width * (imageIndex + 1)],
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`design-view-${imageIndex}`}
                opacity={opacity}
                style={[
                  styles.normalDot,
                  {
                    transform: [{ scaleX }],
                  },
                ]}
              />
            );
          })}
        </View>
      </Block>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    width: SIZES.base * 1.25,
    height: SIZES.base / 4,
    borderRadius: SIZES.radius / 5,
    backgroundColor: COLORS.black,
    marginHorizontal: SIZES.base / 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Carousel;
