import { Block, Button, Divider, Text } from '@components/';
import Loader from '@components/Loader';
import { COLORS, SIZES } from '@constants/';
import { useHeaderHeight } from '@react-navigation/stack';
import onShare from '@utils/onShare';
import { elevationShadowStyle } from '@utils/styleHelper';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CollectionCard = ({data, navigation}) => {
  const onShareComplete = (result) => {
    // Either dissmissed or shared
  };

  const onShareError = (error) => {
    // handle error that occurs
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SingleCollection', {collectionItem: data})
      }>
      <Block style={styles.collectionFeedCard} middle key={data._id}>
        <Block style={styles.collectionFeedImageHolder}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,ar_1.55,c_pad/${data.cdnThumbnail}`,
            }}
            resizeMode="cover"
            style={styles.collectionFeedImage}
          />
        </Block>
        <Block row spaceBetween end padding={[SIZES.padding, 0]}>
          <Block flex={11}>
            <Text bold>{data.name}</Text>
          </Block>
          <Block flex={1}>
            <Button
              raw
              onPress={() =>
                onShare({
                  data: {
                    message: data.name,
                    url: data.slug,
                    title: data.name,
                  },
                  onComplete: onShareComplete,
                  onError: onShareError,
                })
              }>
              <Text small right>
                <Icon name="share-social-outline" size={SIZES.base * 2} />
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const Collection = ({route, navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [collectionFeed, setCollectionFeed] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;

  const getCollectionFeed = () => {
    setLoading(true);
    fetch(
      `https://api.spacejoy.com/api/web/design-collections?skip=${
        Math.random() * 10
      }&limit=100&sort=-1`,
    )
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
      inputRange: [0, 25],
      outputRange: [110, 60],
      extrapolate: 'clamp',
    }),
    left: scrollY.interpolate({
      inputRange: [0, 25],
      outputRange: [SIZES.padding, 60],
      extrapolate: 'clamp',
    }),
    fontSize: scrollY.interpolate({
      inputRange: [0, 25],
      outputRange: [25, 16],
      extrapolate: 'clamp',
    }),
    fontWeight: 'bold',
  };
  return isLoading ? (
    <Loader bgColor={COLORS.white} />
  ) : (
    <Block
      color={COLORS.white}
      padding={[headerHeight, SIZES.padding, 0, SIZES.padding]}>
      <Animated.Text style={animatedTextStyles}>Collections</Animated.Text>
      <AnimatedFlatList
        style={{
          paddingTop: scrollY.interpolate({
            inputRange: [0, 30],
            outputRange: [SIZES.padding + 50, 0],
            extrapolate: 'clamp',
          }),
        }}
        ItemSeparatorComponent={() => (
          <Divider margin={[0, 0, SIZES.padding, 0]} />
        )}
        refreshing={isLoading}
        onRefresh={getCollectionFeed}
        data={collectionFeed}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <CollectionCard data={item} navigation={navigation} />
        )}
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
  container: {flexGrow: 1, justifyContent: 'center'},
  collectionFeedImageHolder: {
    ...elevationShadowStyle(2),
    height: 175,
    width: '100%',
  },
  collectionFeedImage: {
    height: '100%',
    width: '100%',
    borderRadius: SIZES.radius / 2,
  },
});

export default Collection;
