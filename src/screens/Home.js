import Avatar from '@components/Avatar';
import {Block, Button, Divider, Text} from '@components/index';
import {theme} from '@constants/index';
import {elevationShadowStyle} from '@utils/styleHelper';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Share, StatusBar, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import RxUnityBridge from '../utils/rxUnityBridge';

// Setup Unity Bridge
const RxUnityAdapter = RxUnityBridge();

const {SIZES, COLORS} = theme;

const onView3D = async (designId, authToken) => {
  RxUnityAdapter.OpenUnity(designId);
  console.log('Opening Unity with design ID: ', designId);
};

const OnUnityMsgVal = (msg) => {
  console.log('[React] Silently captured msg from unity : ', msg);
};

const OnUnityReturnVal = (msg) => {
  console.log('[React] Silently captured returned from unity : ', msg);
};

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
          onPress={() => navigation.navigate('About', {feedItem: data})}>
          <Text center>
            <Icon name="basket-outline" size={20} color={COLORS.gray} />
          </Text>
        </Button>
      </Block>
    </Block>
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('About', {feedItem: data})}>
      <Block style={styles.designFeedImageHolder}>
        <Image
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
        <Button raw onPress={() => onView3D(data._id, '')}>
          <Icon name="glasses-outline" size={SIZES.base * 2.5} />
        </Button>
      </Block>
      <Block flex={4}>
        <Text small right>
          <Icon name="eye-outline" size={SIZES.base * 2} /> SEE IN MY ROOM
        </Text>
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
  const [isLoading, setLoading] = useState(true);
  const [designFeed, setDesignFeed] = useState([]);

  // Setting up EVent Emitters
  RxUnityAdapter.AddMsgListener(OnUnityMsgVal);
  RxUnityAdapter.AddReturnListener(OnUnityReturnVal);

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
    <Block color="white" padding={[SIZES.base, 0, 0, 0]}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        refreshing={isLoading}
        onRefresh={getDesignFeed}
        data={designFeed.list}
        renderItem={({item}) => <Item data={item} navigation={navigation} />}
        keyExtractor={(item) => item._id}
      />
    </Block>
  );
};

export default Home;

const styles = StyleSheet.create({
  designFeedCard: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  designFeedImageHolder: {
    ...elevationShadowStyle(2),
    height: 220,
    width: '100%',
  },
  designFeedImage: {
    height: '100%',
    width: '100%',
    borderRadius: SIZES.radius,
  },
});
