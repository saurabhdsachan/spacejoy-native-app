import Avatar from '@components/Avatar';
import { Block, Carousel, Divider, Marketing, Text } from '@components/index';
import ProductsList from '@components/ProductsList';
import { images, theme } from '@constants/index';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BookmarkButton from 'src/derivedComponents/BookmarkButton';
import LikeButton from 'src/derivedComponents/LikeButton';
import ShareButton from 'src/derivedComponents/ShareButton';

const { SIZES, COLORS } = theme;

const Details = ({ route, navigation }) => {
  const [feedItem, setFeedItem] = useState(route.params?.feedItem);
  const [isLoading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    setLoading(true);
    const [data, err] = await handle(
      fetcher({
        endPoint: `/web/designs/public/slug/${feedItem.slug}`,
        method: 'GET',
      })
    );
    if (err) {
      setProductList([]);
    } else {
      setProductList(() => {
        const deduplicateProductList = data?.data?.assets?.reduce((acc, currentProduct) => {
          if (!acc[currentProduct?._id]) {
            acc[currentProduct?.asset?._id] = currentProduct;
            return { ...acc };
          }
          return acc;
        }, {});
        return deduplicateProductList ? Object.values(deduplicateProductList) : [];
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    getProductList();
  }, []);

  const onLike = (value) => {
    setFeedItem({ ...feedItem, liked: value });
  };

  const shareDesignParams = {
    message: feedItem.name,
    url: `https://www.spacejoy.com/interior-designs/${feedItem?.room?.slug}/${feedItem?.slug}`,
    title: feedItem.name,
  };

  const onBookmarkChange = (value) => {
    setFeedItem({ ...feedItem, bookmarked: value });
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <Block>
        <Carousel data={feedItem.cdnRender} />
      </Block>
      <Block row center padding={SIZES.padding}>
        <Block flex={10}>
          <Avatar
            uri={
              feedItem?.owner?.avatar
                ? `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,c_fill,g_faces,h_200,w_200/${feedItem?.owner?.avatar}`
                : images.defaultAvatar
            }
            user={{ name: feedItem?.owner?.profile?.name || 'Anonymous User', city: 'Austin', state: 'Texas' }}
          />
        </Block>
        <Block row flex={4} middle>
          <Block end>
            <Text right>
              <LikeButton id={feedItem?._id} liked={feedItem?.liked} onLikeChange={onLike} type="design" />
            </Text>
          </Block>
          <Block>
            <Text right>
              <ShareButton {...shareDesignParams} />
            </Text>
          </Block>
          <Block end>
            <Text right>
              <BookmarkButton
                id={feedItem?._id}
                bookmarked={feedItem?.bookmarked}
                onBookmarkChange={onBookmarkChange}
                type="design"
              />
            </Text>
          </Block>
        </Block>
      </Block>

      <Block style={{ paddingHorizontal: SIZES.padding }}>
        <Divider />
      </Block>

      <Block padding={SIZES.padding}>
        <Text h2 mb2>
          {feedItem.name}
        </Text>
        <Text small>
          For this glamorous living room with bursts of color, we chose some mid-century furniture pieces and added tons
          of textures to create that unique space...
        </Text>
        <ProductsList data={productList} isLoading={isLoading} />
      </Block>
      <Marketing />
    </ScrollView>
  );
};

export default React.memo(Details);
