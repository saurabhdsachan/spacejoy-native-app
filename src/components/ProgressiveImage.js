import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Block from './Block';

const ProgressiveImage = ({thumbnailSource, source, style, ...props}) => {
  const thumbnailAnimated = new Animated.Value(0);
  const imageAnimated = new Animated.Value(0);
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
    }).start();
  };
  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
    }).start();
  };
  return (
    <Block flex={false}>
      <Animated.Image
        {...props}
        source={thumbnailSource}
        style={[style, {opacity: thumbnailAnimated}]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        onLoad={onImageLoad}
      />
    </Block>
  );
};

export default ProgressiveImage;
