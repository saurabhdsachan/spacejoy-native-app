import {Block, Button, Radio, Text} from '@components/index';
import {images, theme} from '@constants/index';
import QuizData from '@data/Quiz3';
import React from 'react';
import {Animated, StatusBar, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;
const {quiz3Banner} = images;

const Quiz3 = ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, 200];
  const scaleImage = scrollY.interpolate({
    inputRange,
    outputRange: [0.8, 0.25],
    extrapolate: 'clamp',
  });
  const translateXImage = scrollY.interpolate({
    inputRange,
    outputRange: [100, 300],
  });
  const translateYImage = scrollY.interpolate({
    inputRange,
    outputRange: [0, -200],
  });
  const translateY = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [50, 0, -100],
  });
  return (
    <Block
      color={COLORS.white}
      padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Animated.Image
        source={quiz3Banner}
        resizeMode="cover"
        style={[
          styles.banner,
          {
            transform: [
              {scale: scaleImage},
              {translateX: translateXImage},
              {translateY: translateYImage},
            ],
          },
        ]}
      />
      <Block animated style={{transform: [{translateY}], marginTop: 150}}>
        <Text h2>What's the occasion?</Text>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}>
          {QuizData.map((item, index) => (
            <Block
              middle
              key={item.title}
              style={[
                styles.radioCard,
                index === QuizData.length - 1 && styles.lastChild,
                index === 0 && styles.firstChild,
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
        </Animated.ScrollView>
      </Block>
      <LinearGradient
        colors={[COLORS.transparent, COLORS.white]}
        style={styles.bottomButtons}>
        <Block center row space="between">
          <Button
            ghost
            size="sm"
            color={COLORS.transparent}
            onPress={() => navigation.goBack()}>
            <Text center>
              <Icon name="ios-arrow-back" size={14} /> Prev
            </Text>
          </Button>
          <Button
            color={COLORS.black}
            size="sm"
            onPress={() => navigation.navigate('Quiz4')}>
            <Text center color={COLORS.white}>
              Next <Icon name="ios-arrow-forward" size={14} />
            </Text>
          </Button>
        </Block>
      </LinearGradient>
    </Block>
  );
};

export default Quiz3;

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: SIZES.width,
    height: 250,
    top: 0,
    left: 0,
  },
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden',
  },
  lastChild: {
    borderBottomWidth: 0,
  },
  firstChild: {
    marginTop: SIZES.padding,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
});
