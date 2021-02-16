import { animations } from '@constants/index';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Animated, Easing } from 'react-native';

const getAnimation = (name) => {
  switch (name) {
    case 'name':
      return animations.Like;
    case 'empty':
      return animations.Empty;
    case 'paymentSuccess':
      return animations.PaymentSuccessful;
    default:
      return animations.Like;
  }
};

const defaultOptions = {
  autoPlay: true,
  loop: false,
};

const LottieAnimations = ({ name, height, width, loop, autoPlay, ...props }) => {
  return <LottieView source={getAnimation(name)} autoPlay loop {...defaultOptions} {...props} />;
};

const LottiePlayer = (animationName, start, end, ...props) => {
  const [progress] = useState(new Animated.Value(start));
  const playAnimation = () => {
    Animated.timing(progress, {
      toValue: end,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  };
  return {
    component: <LottieAnimations name={animationName} progress={progress} {...props} />,
    playAnimation,
  };
};

export { LottiePlayer, LottieAnimations };
