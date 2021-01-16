import {Block, Radio} from '@components/index';
import {images, theme} from '@constants/index';
import QuizData from '@data/Quiz3';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const {SIZES, COLORS} = theme;

const {sofa, lamp, chair, teddy} = images;

const Quiz1 = ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const rotate = scrollY.interpolate({
    inputRange: [-1000, 0, 500],
    outputRange: ['0deg', '360deg', '0deg'],
    extrapolate: 'clamp',
  });

  return (
    <Block flex={18} padding={[SIZES.padding, 0, SIZES.padding, 0]}>
      <Animated.ScrollView
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {y: scrollY},
              useNativeDriver: true,
            },
          },
        ])}
        scrollEventThrottle={1}>
        {QuizData.map((item) => (
          <Block
            middle
            color="#DEE6E1"
            key={item.title}
            style={styles.radioCard}>
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
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 50,
          height: 50,
          backgroundColor: 'red',
          transform: [{rotate}],
        }}
      />
    </Block>
  );
};

export default Quiz1;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    height: 90,
  },
  spaceRight: {
    marginRight: SIZES.padding / 2,
  },
  spaceLeft: {
    marginLeft: SIZES.padding / 2,
  },
  half: {
    minHeight: 80,
    height: 'auto',
  },
  full: {
    height: 190,
  },
});
