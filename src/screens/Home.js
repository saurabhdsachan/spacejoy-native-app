import {Block, Button, Text} from '@components/index';
import {images, theme} from '@constants/index';
import DesignCard from '@derivedComponents/Cards/DesignCard';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
const {SIZES, COLORS} = theme;

const {homeBg} = images;

const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 400;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

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
      'https://api.spacejoy.com/api/designs/search/public?skip=0&limit=100&sort=-1',
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
        renderItem={({item}) => (
          <DesignCard data={item} navigation={navigation} />
        )}
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
});
