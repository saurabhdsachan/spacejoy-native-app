import { Block, Button, ProgressiveImage, Text } from '@components/';
import { COLORS, images, SIZES } from '@constants/';
import { designRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookmarkCard = ({ bookmark, navigation }) => {
  const [singleDesign, setSingleDesign] = useState({});
  const [deleted, setDeleted] = useState(false);

  const [deleteInProcess, setDeleteInProcess] = useState(false);

  useEffect(() => {
    const getSingleDesignFromBookmark = async () => {
      const endPoint = designRoutes.getDetailedBookmarkApi(bookmark._id);
      try {
        const [{ data }, err] = await handle(fetcher({ endPoint, method: 'GET' }));
        if (err || !data.length || !data[0].design) {
          throw new Error();
        }
        if (data[0].design) {
          setSingleDesign(data[0]?.design);
        }
      } catch (e) {
        setSingleDesign({});
      }
    };
    getSingleDesignFromBookmark();
  }, [bookmark]);

  const boomarkThumbnailImage = useMemo(() => {
    try {
      return `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_200/${
        singleDesign?.designImages?.find((imageObj) => imageObj.imgType === 'render').cdn
      }`;
    } catch (e) {
      return 'placeholder';
    }
  }, [singleDesign]);

  const removeBookmark = async () => {
    setDeleteInProcess(true);
    const endPoint = designRoutes.getDetailedBookmarkApi(bookmark._id);
    try {
      const [data] = await handle(fetcher({ endPoint, method: 'DELETE' }));
      if (data) {
        setDeleted(true);
      }
    } finally {
      setDeleteInProcess(false);
    }
  };

  if (deleted) return null;

  return (
    <Button raw onPress={() => navigation.navigate('IdeabookDetailedView', { bookmark })}>
      <Block margin={[SIZES.padding, 0]} row center>
        <ProgressiveImage
          style={bookmarkcardStyles.bookmarkImage}
          thumbnailSource={images.pattern}
          source={{
            uri: boomarkThumbnailImage,
          }}
        />
        <Block flex={10} padding={[0, SIZES.padding]}>
          <Text h2 capitalize>
            {bookmark.name}
          </Text>
          <Text gray numberOfLines={3}>
            Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
            Lorem Ipsum Dolor{' '}
          </Text>
        </Block>
        <Block>
          <Button loading={deleteInProcess} raw onPress={removeBookmark}>
            <Icon color="red" size={SIZES.h3} name="trash" />
          </Button>
        </Block>
      </Block>
    </Button>
  );
};

const bookmarkcardStyles = StyleSheet.create({
  bookmarkImage: {
    height: 100,
    width: 100,
    borderRadius: SIZES.radius,
  },
  rightItem: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

export default BookmarkCard;
