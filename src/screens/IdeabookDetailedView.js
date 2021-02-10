import { Block, Text } from '@components/';
import { SIZES } from '@constants/';
import { designRoutes } from '@constants/routes';
import { useHeaderHeight } from '@react-navigation/stack';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import DesignCard from 'src/derivedComponents/Cards/DesignCard';

const IdeabookDetailedView = ({ route, navigation }) => {
  const [bookmark, setBookmark] = useState(route.params?.bookmark);

  const [bookmarkFeed, setBookmarkFeed] = useState([]);

  useEffect(() => {
    const getBookmarkedDesigns = async () => {
      const endPoint = designRoutes.getDetailedBookmarkApi(bookmark._id);
      try {
        const [{ data }, err] = await handle(fetcher({ endPoint, method: 'GET' }));
        if (err || !data.length) {
          throw new Error();
        }
        setBookmarkFeed(data);
      } catch (e) {
        setBookmarkFeed([]);
      }
    };
    getBookmarkedDesigns();
  }, [bookmark]);

  const headerHeight = useHeaderHeight();

  return (
    <Block flex={false} style={{ height: '100%' }} color="white">
      <View style={{ height: headerHeight, justifyContent: 'flex-end', alignItems: 'space-around' }} color="red">
        <Text capitalize h3 mb2 center>
          {bookmark.name}
        </Text>
      </View>
      <Block padding={[0, SIZES.padding]}>
        <FlatList
          data={bookmarkFeed}
          ListHeaderComponent={<Text h2>{bookmark.name}</Text>}
          ListEmptyComponent={<Text>Should have found something</Text>}
          keyExtractor={(item) => item?.design?._id}
          renderItem={({ item }) => {
            const cdnRender = item?.design?.designImages
              .filter((imageObj) => imageObj.imgType === 'render')
              .map((imageObj) => imageObj.cdn);
            return <DesignCard data={{ ...item.design, cdnRender }} navigation={navigation} />;
          }}
        />
      </Block>
    </Block>
  );
};

export default IdeabookDetailedView;
