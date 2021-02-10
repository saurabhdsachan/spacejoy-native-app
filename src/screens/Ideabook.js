import { Block, Divider, Text } from '@components/';
import Loader from '@components/Loader';
import { SIZES } from '@constants/';
import { ideabookHeader } from '@constants/images';
import { designRoutes } from '@constants/routes';
import { useHeaderHeight } from '@react-navigation/stack';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
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
      <View paddingHorizontal={SIZES.padding}>
        <Text h1 mb2>
          Ideabook
        </Text>
        <Text gray>
          The place where all your favourite designs live. The place where all your favourite designs live. The place
          where all your favourite designs live.
        </Text>
        <Divider style={styles.dividerMargin} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
        ListItemSeparator={<Divider />}
        ListEmptyComponent={loading ? <Loader /> : <Text center>Create new Ideabooks to see them here</Text>}
        data={bookmarkList}
        keyExtractor={(item) => {
          return item?._id;
        }}
        renderItem={({ item }) => <BookmarkCard bookmark={item} navigation={navigation} />}
      />
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
