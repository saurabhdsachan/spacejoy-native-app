import {Block, Radio, Text} from '@components/';
import {theme} from '@constants/';
import QuizData from '@data/Quiz3';
import React, {Component} from 'react';
import {Animated, ScrollView, StyleSheet} from 'react-native';

const {SIZES, COLORS} = theme;

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 300;

export default class Demo extends Component {
  constructor() {
    super();
    this.scrollYAnimatedValue = new Animated.Value(0);
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['#e91e63', '#1DA1F2'],
      extrapolate: 'clamp',
    });

    return (
      <Block middle color={COLORS.white} padding={SIZES.padding}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          {QuizData?.map((item, index) => (
            <Block
              middle
              key={item.title}
              style={[
                styles.radioCard,
                index === QuizData.length - 1 && styles.lastChild,
              ]}>
              <Radio
                inline
                button={{
                  label: item.title,
                  size: 18,
                  color: item.bg,
                  selected: false,
                }}
              />
            </Block>
          ))}
        </ScrollView>
        <Block
          animated
          middle
          style={[
            styles.banner,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <Text center color={COLORS.white} h3>
            Animated Header
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden',
  },
  lastChild: {
    paddingBottom: 150,
    borderBottomWidth: 0,
  },
  banner: {
    position: 'absolute',
    height: 150,
    top: 0,
    right: 0,
    left: 0,
  },
});
