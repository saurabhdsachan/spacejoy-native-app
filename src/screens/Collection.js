import { Block } from '@components/';
import Loader from '@components/Loader';
import { COLORS, SIZES } from '@constants/';
import { useHeaderHeight } from '@react-navigation/stack';
import { elevationShadowStyle } from '@utils/styleHelper';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import CollectionCard from 'src/derivedComponents/Cards/CollectionCard';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Collection = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [collectionFeed, setCollectionFeed] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const getCollectionFeed = () => {
    setLoading(true);
    fetch(`https://api.spacejoy.com/api/web/design-collections?skip=${Math.random() * 10}&limit=100&sort=-1`)
      .then((response) => response.json())
      .then((json) => setCollectionFeed(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
    });
    getCollectionFeed();
  }, []);

  const headerHeight = useHeaderHeight();
  const animatedTextStyles = {
    position: 'absolute',
    top: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [100, headerHeight - 32],
      extrapolate: 'clamp',
    }),
    left: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [SIZES.padding, 50],
      extrapolate: 'clamp',
    }),
    fontSize: scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [SIZES.title, SIZES.h3],
      extrapolate: 'clamp',
    }),
    fontWeight: 'bold',
  };
  return isLoading ? (
    <Loader bgColor={COLORS.white} />
  ) : (
    <Block color={COLORS.white} padding={[headerHeight, SIZES.padding, 0, SIZES.padding]}>
      <Animated.Text style={animatedTextStyles}>Collections</Animated.Text>
      <AnimatedFlatList
        style={{
          paddingTop: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [80, 0],
            extrapolate: 'clamp',
          }),
        }}
        refreshing={isLoading}
        onRefresh={getCollectionFeed}
        data={collectionFeed}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => <CollectionCard data={item} navigation={navigation} />}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={1}
        keyExtractor={(item) => item._id}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  collectionFeedCard: {
    borderRadius: SIZES.radius / 2,
    marginVertical: SIZES.base,
  },
  container: { flexGrow: 1, justifyContent: 'center' },
  collectionFeedImageHolder: {
    ...elevationShadowStyle(0),
    height: 175,
    width: '100%',
  },
  collectionFeedImage: {
    height: '100%',
    width: '100%',
  },
});

export default Collection;
