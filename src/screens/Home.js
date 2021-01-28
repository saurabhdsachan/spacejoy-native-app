import Avatar from '@components/Avatar';
import {
  Block,
  Button,
  Divider,
  ProgressiveImage,
  Text,
} from '@components/index';
import {images, theme} from '@constants/index';
import React, {useEffect, useState} from 'react';
import {FlatList, Share, StatusBar, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const {homeBg} = images;

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 400;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const onShare = async (msg, slug) => {
  try {
    const result = await Share.share({
      message: msg,
      title: 'SPacejoy',
      url: slug,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const Item = ({data, navigation}) => (
  <Block
    color={COLORS.white}
    middle
    style={styles.designFeedCard}
    key={data._id}>
    <Block row center padding={[0, 0, SIZES.padding, 0]}>
      <Block flex={3}>
        <Avatar
          uri="https://res.cloudinary.com/spacejoy/image/upload/c_thumb,g_face,fl_lossy,q_auto,f_auto,h_120,w_120/v1581506948/web/Customer%20Stories_Assets/Amber/Amber_profile_n4lpwa.jpg"
          user={{name: 'Amber Esperaza', city: 'Austin', state: 'Texas'}}
        />
      </Block>
      <Block end flex={1}>
        <Button
          size="xs"
          onPress={() => navigation.navigate('Details', {feedItem: data})}>
          <Text center>
            <Icon name="basket-outline" size={20} color={COLORS.gray} />
          </Text>
        </Button>
      </Block>
    </Block>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Details', {feedItem: data})}>
      <Block style={styles.designFeedImageHolder}>
        <ProgressiveImage
          source={{
            uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_800/${data.cdnRender[0]}`,
          }}
          resizeMode="cover"
          style={styles.designFeedImage}
        />
      </Block>
    </TouchableOpacity>
    <Block row padding={SIZES.padding / 2}>
      <Block>
        <Icon name="md-heart-outline" size={SIZES.base * 2.5} />
      </Block>
      <Block>
        <Button raw onPress={() => onShare(data.name, data.slug)}>
          <Icon name="share-social-outline" size={SIZES.base * 2.5} />
        </Button>
      </Block>
      <Block>
        <Button raw>
          <Icon name="cube-outline" size={SIZES.base * 2.5} />
        </Button>
      </Block>
      <Block flex={4}>
        <Button raw>
          <Text small right>
            <Icon name="ios-color-wand-outline" size={SIZES.base * 2.5} /> Try
            in my room
          </Text>
        </Button>
      </Block>
    </Block>
    <Text h3 left mt2>
      {data.name}
    </Text>
    <Text left mt2 mb4 small>
      {data.name}
    </Text>
    <Divider />
  </Block>
);

const Home = ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const [isLoading, setLoading] = useState(true);
  const [designFeed, setDesignFeed] = useState([]);

  const inputRange = [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT];

  const headerHeight = scrollY.interpolate({
    inputRange,
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const translateY = scrollY.interpolate({
    inputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -HEADER_MAX_HEIGHT],
    extrapolate: 'clamp',
  });

  const getDesignFeed = () =>
    fetch(
      `https://api.spacejoy.com/api/designs/search/public?skip=${
        Math.random() * 10
      }&limit=100&sort=-1`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: {}}),
      },
    )
      .then((response) => response.json())
      .then((json) => setDesignFeed(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  useEffect(() => {
    getDesignFeed();
  }, []);

  return (
    <Block color="white" paddingTop={SIZES.padding}>
      <StatusBar barStyle="dark-content" />
      <AnimatedFlatList
        contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
        scrollEventThrottle={16}
        refreshing={isLoading}
        onRefresh={getDesignFeed}
        data={designFeed.list}
        renderItem={({item}) => <Item data={item} navigation={navigation} />}
        keyExtractor={(item) => item._id}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      />

      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: headerHeight,
            backgroundColor: COLORS.white,
            overflow: 'hidden',
          },
        ]}>
        <Animated.View style={[styles.homeBanner, {transform: [{translateY}]}]}>
          <Animated.Image
            resizeMode="cover"
            source={homeBg}
            style={[styles.homeBannerImage, {height: headerHeight}]}
          />
          <Text light mb2 color={COLORS.gra2}>
            Get Flat
          </Text>
          <Text title>30% Off</Text>
          <Text body mb3 color={COLORS.gra2}>
            * on all design packages
          </Text>
          <Button
            color={COLORS.green}
            size="sm"
            onPress={() => navigation.navigate('NewAction')}>
            <Text white>
              Let's start <Icon name="arrow-forward" size={14} />
            </Text>
          </Button>
        </Animated.View>
      </Animated.View>
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeBanner: {
    height: '100%',
    padding: SIZES.padding,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  homeBannerImage: {
    ...StyleSheet.absoluteFill,
    width: SIZES.width,
  },
  designFeedCard: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  designFeedImageHolder: {
    height: 220,
    width: '100%',
  },
  designFeedImage: {
    height: '100%',
    width: '100%',
  },
});
