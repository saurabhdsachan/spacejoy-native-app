import {Block, Button, Text} from '@components/index';
import {images, theme} from '@constants/index';
import React from 'react';
import {Animated, Image, StatusBar, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {COLORS, SIZES} = theme;

const {onboarding1, onboarding2, onboarding3} = images;

const onBoardings = [
  {
    title: 'Work 1:1 with Design Experts',
    description:
      'Our expert online interior designers will transform any room in your home in your style and budget',
    img: onboarding1,
  },
  {
    title: 'Experience Designs in 3D',
    description:
      'On our interactive 3D desktop App, see your actual room designed in 3D with handpicked products',
    img: onboarding2,
  },
  {
    title: 'Shop From Your Designs',
    description:
      'Shop furniture and decor from your design all at once. Or, bring your room to life',
    img: onboarding3,
  },
];

const WalkThrough = ({navigation}) => {
  const [completed, setCompleted] = React.useState(false);
  const [slideCount, setSlideCount] = React.useState(1);

  const animatedScrollViewRef = React.useRef();
  const scrollX = new Animated.Value(0);

  const nextSlide = () => {
    animatedScrollViewRef.current.scrollTo({
      x: SIZES.width * slideCount,
      animated: true,
    });
    setSlideCount(slideCount + 1);
  };

  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      Math.floor(value) > SIZES.width
        ? setCompleted(true)
        : setCompleted(false);
    });
    return () => scrollX.removeListener();
  }, [scrollX, slideCount]);

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <Block style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot]}
            />
          );
        })}
      </Block>
    );
  };

  return (
    <Block>
      <StatusBar barStyle="dark-content" />
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        ref={animatedScrollViewRef}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}>
        {onBoardings.map((item, index) => (
          <Block key={`img-${index}`} style={styles.slideContainer}>
            <Block style={styles.imageHolder}>
              <Image
                source={item.img}
                resizeMode="cover"
                style={styles.image}
              />
            </Block>
            <Block style={styles.contentHolder}>
              <Text h2 style={styles.heading} center>
                {item.title}
              </Text>
              <Text small center>
                {item.description}
              </Text>
            </Block>
            <Block style={styles.buttonsHolder}>
              {completed ? (
                <Button
                  size="sm"
                  color="black"
                  onPress={() => navigation.navigate('Home')}>
                  <Text color="white">
                    START <Icon name="arrow-forward" size={14} />{' '}
                  </Text>
                </Button>
              ) : (
                <Button size="sm" onPress={nextSlide} color="black">
                  <Text color="white">
                    NEXT <Icon name="arrow-forward" size={14} />
                  </Text>
                </Button>
              )}
            </Block>
          </Block>
        ))}
      </Animated.ScrollView>
      <Block style={styles.skipHolder}>
        <Button
          color={COLORS.semiTransparent}
          size="xs"
          onPress={() => navigation.navigate('Home')}>
          <Text>SKIP</Text>
        </Button>
      </Block>
      <Block style={styles.dotsHolder}>{renderDots()}</Block>
    </Block>
  );
};

export default WalkThrough;

const styles = StyleSheet.create({
  slideContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingBottom: 20,
  },
  imageHolder: {
    flex: 8,
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentHolder: {
    flex: 2,
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  heading: {
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  buttonsHolder: {
    flex: 1,
    flexDirection: 'row',
    width: SIZES.width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
  },
  dotsHolder: {
    width: '100%',
    position: 'absolute',
    bottom: '11%',
    paddingHorizontal: SIZES.padding,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.padding,
  },
  dot: {
    width: SIZES.base * 1.2,
    height: SIZES.base / 4,
    borderRadius: SIZES.radius / 5,
    backgroundColor: COLORS.black,
    marginHorizontal: SIZES.base / 3,
  },
  skipHolder: {
    position: 'absolute',
    top: SIZES.padding * 3,
    right: SIZES.padding,
  },
});
