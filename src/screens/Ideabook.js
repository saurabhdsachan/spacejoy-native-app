import { Block, Button, Divider, Text } from '@components/';
import Loader from '@components/Loader';
import { COLORS, SIZES } from '@constants/';
import { ideabookHeader } from '@constants/images';
import { designRoutes } from '@constants/routes';
import { useHeaderHeight } from '@react-navigation/stack';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BookmarkCard from 'src/derivedComponents/Cards/BookmarkCard';

const Ideabook = ({ navigation }) => {
  const headerHeight = useHeaderHeight();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [type, setType] = useState('design');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBookmarks = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    getBookmarks();
  }, [type]);

  return (
    <Block color={COLORS.white}>
      <LinearGradient
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        locations={[1, 0.5]}
        style={[styles.headerImageBox, { paddingTop: headerHeight - 20, height: headerHeight + 150 }]}
        colors={['#44D7B6', '#fff']}
      >
        <Image resizeMode="contain" style={styles.headerImage} source={ideabookHeader} />
      </LinearGradient>
      <Block flex={1} paddingHorizontal={SIZES.padding}>
        <Text h1 mb2>
          Ideabook
        </Text>
        <Text small>
          The place where all your favourite designs live. The place where all your favourite designs live. The place
          where all your favourite designs live.
        </Text>
      </Block>
      <Block flex={4}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
          ListItemSeparator={<Divider />}
          ListEmptyComponent={
            loading ? (
              <Loader />
            ) : (
              <Block center middle paddingVertical={SIZES.padding * 3}>
                <Text mb2 mt1 center>
                  Create new Ideabook
                </Text>
                <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Collection')}>
                  <Text center white>
                    Go to Collections
                  </Text>
                </Button>
              </Block>
            )
          }
          data={bookmarkList}
          keyExtractor={(item) => item?._id}
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
