import { Block, Divider, Text } from '@components/index';
import { theme } from '@constants/index';
import { fetcher, handle } from '@utils/apiFetcher';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import Animated from 'react-native-reanimated';
import DesignCard from 'src/derivedComponents/Cards/DesignCard';

const { SIZES } = theme;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Home = ({ navigation, route }) => {
  const [isLoading, setLoading] = useState(true);
  const [designFeed, setDesignFeed] = useState([]);
  const [error, setError] = useState(false);

  const getDesignFeed = async () => {
    setLoading(true);
    try {
      const [dataList, err] = await handle(
        fetcher({
          endPoint: `/designs/search/public?skip=${Math.random() * 10}&limit=100&sort=-1`,
          method: 'POST',
          body: { data: {} },
        })
      );
      if (err) setError(true);
      setDesignFeed(dataList.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDesignFeed();
  }, []);

  return (
    <Block color="white" paddingHorizontal={SIZES.padding}>
      <StatusBar barStyle="dark-content" />
      <AnimatedFlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshing={isLoading}
        ListEmptyComponent={
          error && (
            <Block center middle>
              <Text center mt4 mb2 h2>
                Uh-Oh...
              </Text>
              <Text small center>
                Failed to Load your feed. Pull down to try again
              </Text>
            </Block>
          )
        }
        onRefresh={getDesignFeed}
        data={designFeed.list}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <DesignCard data={item} navigation={navigation} route={route} />}
        keyExtractor={(item) => item._id}
      />
    </Block>
  );
};

export default React.memo(Home);
