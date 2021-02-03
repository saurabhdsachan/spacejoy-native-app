import {Block, Button, Divider, ProgressiveImage, Text} from '@components/';
import Avatar from '@components/Avatar';
import {COLORS, SIZES} from '@constants/';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkButton from '../BookmarkButton';
import LikeButton from '../LikeButton';
import ShareButton from '../ShareButton';

const DesignCard = ({data: designDataProp, navigation}) => {
  const [data, setData] = useState(designDataProp);

  const onBookmarked = (value) => {
    setData({...data, bookmarked: value});
  };

  const handleLike = (liked) => {
    setData({...data, liked});
  };

  const shareParams = {
    message: designDataProp.name,
    url: `https://www.spacejoy.com/interior-designs/${designDataProp?.room?.slug}/${designDataProp?.slug}`,
    title: designDataProp.name,
  };

  return (
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
          <BookmarkButton
            type="design"
            id={data?._id}
            bookmarked={data?.bookmarked}
            onBookmarkChange={onBookmarked}
          />
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
          <LikeButton
            liked={data?.liked}
            type="designs"
            id={data?._id}
            onLikeChange={handleLike}
          />
        </Block>
        <Block>
          <ShareButton {...shareParams} />
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
};

const styles = StyleSheet.create({
  designFeedCard: {
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

export default DesignCard;
