import { images, theme } from '@constants/index';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Button from './Button';
import ProgressiveImage from './ProgressiveImage';

const { COLORS, SIZES } = theme;

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [initIndex, setInitIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const tmp = [];
    data.map((image) =>
      tmp.push({
        url: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_${SIZES.width * 2}/${image}`,
      })
    );
    setImageData(tmp);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Block style={styles.scrollContainer}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        >
          {data?.map((image, imageIndex) => {
            return (
              <Block key={imageIndex}>
                <ProgressiveImage
                  resizeMode="cover"
                  thumbnailSource={images.pattern}
                  source={{
                    uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_${
                      SIZES.width * 2
                    }/${image}`,
                  }}
                  style={{ width: SIZES.width, height: 250 }}
                />
                <Button
                  size="sm"
                  color={COLORS.semiTransparent}
                  style={styles.zoomButton}
                  onPress={() => {
                    setShowModal(true);
                    setInitIndex(imageIndex);
                  }}
                >
                  <Icon name="expand-sharp" size={20} style={styles.zoomIcon} />
                </Button>
              </Block>
            );
          })}
        </Animated.ScrollView>
        <View style={styles.indicatorContainer}>
          {data?.map((image, imageIndex) => {
            const opacity = scrollX.interpolate({
              inputRange: [SIZES.width * (imageIndex - 1), SIZES.width * imageIndex, SIZES.width * (imageIndex + 1)],
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            const scaleX = scrollX.interpolate({
              inputRange: [SIZES.width * (imageIndex - 1), SIZES.width * imageIndex, SIZES.width * (imageIndex + 1)],
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`design-view-${imageIndex}`}
                opacity={opacity}
                style={[
                  styles.normalDot,
                  {
                    transform: [{ scaleX }],
                  },
                ]}
              />
            );
          })}
        </View>
      </Block>
      <Modal visible={showModal} transparent={true}>
        <ImageViewer
          useNativeDriver
          enableSwipeDown
          swipeDownThreshold={100}
          imageUrls={imageData}
          index={initIndex}
          onSwipeDown={() => setShowModal(false)}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalDot: {
    width: SIZES.base * 1.25,
    height: SIZES.base / 4,
    borderRadius: SIZES.radius / 5,
    backgroundColor: COLORS.black,
    marginHorizontal: SIZES.base / 2,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButton: {
    position: 'absolute',
    bottom: SIZES.base * 3,
    right: SIZES.base * 1.25,
    width: SIZES.base * 5,
    height: SIZES.base * 5,
    borderRadius: 2,
  },
  zoomIcon: {
    ...StyleSheet.absoluteFill,
    top: SIZES.base * 1.25,
    left: SIZES.base * 1.25,
  },
});

export default Carousel;
