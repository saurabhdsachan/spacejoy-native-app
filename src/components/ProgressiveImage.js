import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import Block from './Block';
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
});
class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);
  imageAnimated = new Animated.Value(0);
  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  };
  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  };
  render() {
    const {thumbnailSource, source, style, ...props} = this.props;
    return (
      <Block>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, {opacity: this.thumbnailAnimated}]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, style]}
          onLoad={this.onImageLoad}
        />
      </Block>
    );
  }
}
export default ProgressiveImage;
