import React, {useState, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import LottieView from 'lottie-react-native';
import {animations} from '@constants/';

const getAnimation = (name) => {
  switch (name) {
    case 'name':
      return animations.Like;
    // case 'lock':
    //   return Lock;
    // case 'celebration':
    //   return Celebration;
    // case 'background':
    //   return Love;
    // case 'refund':
    //   return Refund;
    // case 'refund-policy':
    //   return RefundPolicy;
    // case 'search':
    //   return Search;
    // case 'empty':
    //   return Empty;
    // case 'summer':
    //   return Summer;
    // case 'gift':
    //   return Gift;
    // case 'error':
    //   return ErrorData;
    // case 'processing':
    //   return Processing;
    // case 'quizResult':
    //   return Puzzle;
    default:
      return animations.Like;
  }
};

const defaultOptions = {
  autoPlay: false,
  loop: false,
};

const LottieAnimations = ({name, height, width, loop, autoPlay, ...props}) => {
  return (
    <LottieView
      source={getAnimation(name)}
      autoPlay
      loop
      {...defaultOptions}
      {...props}
    />
  );
};

const LottiePlayer = (animationName, start, end, direction) => {
  const [progress, setProgress] = useState(new Animated.Value(start));
  const playAnimation = () => {
    Animated.timing(progress, {
      toValue: end,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };
  return {
    component: <LottieAnimations name={animationName} progress={progress} />,
    playAnimation: playAnimation,
  };
};

export default LottiePlayer;
