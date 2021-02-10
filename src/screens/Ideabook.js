import { Block, Button, Divider, ProgressiveImage, Text } from '@components/';
import { images, SIZES } from '@constants/';
import { ideabookHeader } from '@constants/images';
import { designRoutes } from '@constants/routes';
import { useHeaderHeight } from '@react-navigation/stack';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BookmarkCard = ({ bookmark, navigation }) => {
  const [singleDesign, setSingleDesign] = useState({});

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
        <Block padding={[0, SIZES.padding]}>
          <Text h2 capitalize>
            {bookmark.name}
          </Text>
          <Text gray numberOfLines={3}>
            Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum Dolor
            Lorem Ipsum Dolor{' '}
          </Text>
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
});

const Ideabook = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [type, setType] = useState('design');

  useEffect(() => {
    const getBookmarks = async () => {
      const endPoint = designRoutes.getUserBookmarks();

      try {
        const [fetchedBookmarkList, error] = await handle(fetcher({ endPoint, method: 'GET' }));
        if (error) {
          throw new Error();
        } else {
          if (fetchedBookmarkList.data.length) setBookmarkList(fetchedBookmarkList.data);
          else {
            setBookmarkList([]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    getBookmarks();
  }, [type]);

  return (
    <Block color="white">
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[1, 0.5]}
        style={[styles.headerImageBox, { paddingTop: headerHeight - 20, height: headerHeight + 150 }]}
        colors={['#44D7B6', '#fff']}
      >
        <Image resizeMode="contain" style={styles.headerImage} source={ideabookHeader} />
      </LinearGradient>
      <Block padding={[SIZES.padding, SIZES.padding, 0, SIZES.padding]}>
        <Text h1 mb2>
          Ideabook
        </Text>
        <Text gray>
          The place where all your favourite designs live. The place where all your favourite designs live. The place
          where all your favourite designs live.
        </Text>
        <Divider style={styles.dividerMargin} />
        <FlatList
          ListItemSeparator={<Divider />}
          data={bookmarkList}
          keyExtractor={(item) => {
            return item?._id;
          }}
          renderItem={({ item }) => <BookmarkCard bookmark={item} navigation={navigation} />}
        />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  headerImageBox: {
    width: '50%',
    padding: SIZES.padding * 2,
  },
  dividerMargin: {
    marginTop: SIZES.padding,
  },
  headerImage: {
    width: 175,
    height: 150,
  },
});

export default Ideabook;
