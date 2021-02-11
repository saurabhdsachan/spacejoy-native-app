import { Block, Button, Divider, Text } from '@components/';
import Loader from '@components/Loader';
import { SIZES } from '@constants/';
import { designRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import DesignCard from 'src/derivedComponents/Cards/DesignCard';

const IdeabookDetailedView = ({ route, navigation }) => {
  const [bookmark] = useState(route.params?.bookmark);
  const [loading, setLoading] = useState(false);
  const [bookmarkFeed, setBookmarkFeed] = useState([]);
  const [tryAgain, setTryAgain] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const getBookmarkedDesigns = async () => {
      setLoading(true);
      const endPoint = designRoutes.getDetailedBookmarkApi(bookmark._id);
      try {
        const [{ data }, err] = await handle(fetcher({ endPoint, method: 'GET' }));
        if (err || !data.length) {
          throw new Error();
        }
        setBookmarkFeed(data);
      } catch (e) {
        setError(true);
        setBookmarkFeed([]);
      } finally {
        setLoading(false);
      }
    };
    if (tryAgain) {
      setTryAgain(false);
      getBookmarkedDesigns();
    }
  }, [bookmark, tryAgain]);

  const onTryAgain = () => {
    setTryAgain(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text bold h3>
          {bookmark.name}
        </Text>
      ),
    });
  }, [bookmark, navigation]);

  return (
    <Block color="white" padding={[0, SIZES.padding]}>
      <FlatList
        data={bookmarkFeed}
        ListItemSeparator={<Divider />}
        ListEmptyComponent={() => {
          if (loading) {
            return <Loader />;
          }
          if (error) {
            return (
              <Block center middle>
                <Text center mt4 mb2 h2>
                  Uh-Oh...
                </Text>
                <Text small center mb3>
                  Failed to load your Ideabook. Tap to try loading again.
                </Text>
                <Button size="sm" ghost onPress={onTryAgain}>
                  <Text>Try Again</Text>
                </Button>
              </Block>
            );
          }
        }}
        keyExtractor={(item) => item?.design?._id}
        renderItem={({ item }) => {
          const cdnRender = item?.design?.designImages
            .filter((imageObj) => imageObj.imgType === 'render')
            .map((imageObj) => imageObj.cdn);
          return <DesignCard data={{ ...item.design, cdnRender }} navigation={navigation} noBookmark />;
        }}
      />
    </Block>
  );
};

export default IdeabookDetailedView;
