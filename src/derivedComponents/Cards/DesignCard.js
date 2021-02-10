import { Block, Button, ProgressiveImage, Text } from '@components/';
import Avatar from '@components/Avatar';
import { COLORS, images, SIZES } from '@constants/';
import onShare from '@utils/onShare';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkButton from '../BookmarkButton';
import LikeButton from '../LikeButton';
import ShareButton from '../ShareButton';

const DesignCard = ({ data: designDataProp, navigation }) => {
  const [data, setData] = useState(designDataProp);

  const onBookmarkChange = (value) => {
    setData({ ...data, bookmarked: value });
  };

  const handleLike = (liked) => {
    setData({ ...data, liked });
  };

  const shareParams = {
    message: designDataProp.name,
    url: `https://www.spacejoy.com/interior-designs/${designDataProp?.room?.slug}/${designDataProp?.slug}`,
    title: designDataProp.name,
  };

  return (
    <Block middle style={styles.designFeedCard} key={data._id}>
      <Block row center>
        <Block flex={3}>
          <Avatar
            uri={
              data?.owner?.avatar
                ? `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,c_fill,g_faces,h_200,w_200/${data?.owner?.avatar}`
                : images.defaultAvatar
            }
            user={{ name: data?.owner?.profile?.name || 'Anonymous User', city: 'Austin', state: 'Texas' }}
          />
        </Block>
        <Block end flex={1}>
          <BookmarkButton
            bookmarked={data?.bookmarked}
            onBookmarkChange={onBookmarkChange}
            type="design"
            id={data?._id}
          />
        </Block>
      </Block>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Details', { feedItem: data })}>
        <Block style={styles.designFeedImageHolder}>
          <ProgressiveImage
            thumbnailSource={images.pattern}
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,h_${SIZES.height * 2}/${
                data.cdnRender[2]
              }`,
            }}
            resizeMode="cover"
            style={styles.designFeedImage}
          />
        </Block>
      </TouchableOpacity>
      <Block row paddingHorizontal={SIZES.padding / 2} paddingVertical={SIZES.padding / 2}>
        <Block>
          <LikeButton id={data?._id} liked={data?.liked} onLikeChange={handleLike} type="designs" />
        </Block>
        <Block>
          <Button raw onPress={() => onShare(data.name, data.slug)}>
            <ShareButton {...shareParams} />
          </Button>
        </Block>
        <Block flex={4}>
          <Button raw>
            <Text small right>
              <Icon name="cube-outline" size={SIZES.base * 2.5} /> Try in 3D
            </Text>
          </Button>
        </Block>
      </Block>
      <Text small capitalize color={COLORS.red}>
        {data.theme.name}
      </Text>
      <Text h2 left mt1 mb1>
        {data.name}
      </Text>
    </Block>
  );
};

const styles = StyleSheet.create({
  designFeedCard: {
    paddingVertical: SIZES.padding,
  },
  designFeedImageHolder: {
    height: SIZES.height / 1.85,
    width: '100%',
    paddingVertical: SIZES.padding / 2,
  },
  designFeedImage: {
    borderRadius: SIZES.radius / 2,
    height: '100%',
    width: '100%',
  },
});

export default DesignCard;
