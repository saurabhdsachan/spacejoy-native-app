import { Block } from '@components/';
import DesignCard from '@components/DesignCard';
import MarketingBanner from '@components/MarketingBanner';
import { theme } from '@constants/';
import QuizData from '@data/Quiz3';
import React from 'react';
import { Animated, FlatList, StatusBar, StyleSheet } from 'react-native';

const { SIZES, COLORS } = theme;

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 300;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Demo = () => {
  const scrollYAnimatedValue = new Animated.Value(0);

  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [COLORS.red, COLORS.white],
    extrapolate: 'clamp',
  });

  return (
    <Block middle color={COLORS.white} padding={SIZES.padding}>
      <StatusBar barStyle="dark-content" />
      <AnimatedFlatList
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        data={QuizData}
        keyExtractor={(item) => item.title}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }], {
          useNativeDriver: false,
        })}
        renderItem={({ index, item }) => <DesignCard index={index} item={item} />}
      />
      <Block animated middle style={[styles.banner, { height: headerHeight, backgroundColor: headerBackgroundColor }]}>
        <MarketingBanner />
      </Block>
    </Block>
  );
};

export default Demo;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    overflow: 'hidden',
    height: 150,
    top: 0,
    right: 0,
    left: 0,
  },
});
