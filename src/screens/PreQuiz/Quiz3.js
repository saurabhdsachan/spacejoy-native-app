import { Block, Button, Radio, Text } from '@components/';
import { images, theme } from '@constants/index';
import QuizData from '@data/Quiz3';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const { quiz3Banner, bg } = images;

const HEADER_MIN_HEIGHT = 170;
const HEADER_MAX_HEIGHT = 280;

const handleChange = (value) => {
  alert(value);
};

const Quiz3 = ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const inputRange = [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT];

  const headerHeight = scrollY.interpolate({
    inputRange,
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 0.5],
    extrapolate: 'clamp'
  });

  const scaleBg = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1.25],
    extrapolate: 'clamp'
  });

  const translateX = scrollY.interpolate({
    inputRange,
    outputRange: [0, 200],
    extrapolate: 'clamp'
  });

  return (
    <Block middle color={COLORS.white} padding={SIZES.padding}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      >
        {QuizData?.map((item, index) => (
          <Block middle key={item.title} style={[styles.radioCard, index === QuizData.length - 1 && styles.lastChild]}>
            <Radio
              inline
              button={{
                label: item.title,
                value: item.title,
                size: 18,
                color: item.bg,
                selected: false
              }}
              onChange={handleChange}
            />
          </Block>
        ))}
      </Animated.ScrollView>
      <Block
        padding={SIZES.padding}
        animated
        bottom
        color={COLORS.white}
        style={[styles.banner, { height: headerHeight }]}
      >
        <Animated.Image
          source={bg}
          resizeMode="contain"
          style={[styles.bannerImageBg, { transform: [{ scale: scaleBg }, { translateX: -150 }] }]}
        />
        <Animated.Image
          source={quiz3Banner}
          resizeMode="contain"
          style={[
            styles.bannerImage,
            {
              transform: [{ scale }, { translateX }]
            }
          ]}
        />

        <Text h2 mb1>
          What's the occasion?
        </Text>
        <Text small>We build our vision around your purpose!</Text>
      </Block>
      <Block
        paddingHorizontal={SIZES.padding}
        color={COLORS.white}
        style={styles.bottomButtons}
        center
        row
        space="between"
      >
        <Button ghost size="sm" color={COLORS.transparent} onPress={() => navigation.goBack()}>
          <Text center>
            <Icon name="ios-arrow-back" size={14} /> Prev
          </Text>
        </Button>
        <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Quiz4')}>
          <Text center color={COLORS.white}>
            Next <Icon name="ios-arrow-forward" size={14} />
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Quiz3;

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden'
  },
  lastChild: {
    paddingBottom: 100,
    borderBottomWidth: 0
  },
  banner: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  bannerImage: {
    position: 'absolute',
    top: -20,
    right: 0,
    left: 0,
    height: 200,
    width: SIZES.width
  },
  bannerImageBg: {
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    height: 90,
    left: 0,
    right: 0
  }
});
