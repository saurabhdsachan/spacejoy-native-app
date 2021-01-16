import { Block, Divider, Text } from '@components/';
import Accordion from '@components/Accordion';
import Loader from '@components/Loader';
import { COLORS, SIZES } from '@constants/';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const CollectionFAQs = ({id}) => {
  const [collectionFaq, setCollectionFaq] = useState([]);

  const getCollectionFaq = () => {
    fetch(`https://api.spacejoy.com/api/v1/faqs/designCollections/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => setCollectionFaq(json.data))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getCollectionFaq();
  }, [id]);

  return (
    <Block>
      {collectionFaq.map((item) => {
        return (
          <Accordion
            key={item?._id}
            title={item.faq.question}
            description={item.faq.answer}
          />
        );
      })}
    </Block>
  );
};

const DesignCard = ({data, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('About', {feedItem: data})}>
      <Block color={COLORS.white} middle style={styles.designCard}>
        <Block style={styles.designImageHolder}>
          <Image
            style={styles.designCardImage}
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,ar_1.55,c_pad/${data?.cdnRender[0]}`,
            }}
          />
        </Block>
        <Block>
          <Block>
            <Text caption mt2 gray transform={'capitalize'}>
              {data?.theme?.name}
            </Text>
          </Block>
          <Block>
            <Text numberOfLines={1} bold small>
              {data?.name}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const SingleCollection = ({route, navigation}) => {
  const {
    params: {collectionItem = {}},
  } = route;
  const [collectionData, setCollectionData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const getDetailedCollection = () => {
    setLoading(true);
    fetch(
      `https://api.spacejoy.com/api/web/design-collection/${collectionItem.slug}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((json) => setCollectionData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>{}</Text>,
    });
    if (collectionItem.slug) {
      getDetailedCollection();
    }
  }, [collectionItem, navigation]);

  // Text-ellipses control
  const [ellipsis, setEllipsis] = useState(true);

  const onChangeSizeClick = () => {
    setEllipsis(!ellipsis);
  };

  const handleScroll = (e) => {
    const {
      nativeEvent: {
        contentOffset: {x, y},
      },
    } = e;
    if (y > 230) {
      navigation.setOptions({
        headerTitle: () => <Text>{collectionItem?.name}</Text>,
      });
    } else {
      navigation.setOptions({
        headerTitle: () => <></>,
      });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Block color={COLORS.white}>
      <ScrollView scrollEventThrottle={20} onScroll={handleScroll}>
        <Block>
          <Image
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,h_400,ar_2,c_pad/${
                collectionItem.cdnThumbnail || collectionData.cdnCover
              }`,
            }}
            style={{width: '100%', height: 190}}
          />
        </Block>
        <Block padding={[SIZES.padding]}>
          <Block>
            <Text h2 mt1>
              {collectionData?.name || collectionItem?.name}
            </Text>
          </Block>
        </Block>
        <Block paddingHorizontal={SIZES.padding}>
          <Block>
            <Text light {...(ellipsis ? {numberOfLines: 3} : {})} mt0 small>
              {collectionData?.description}
            </Text>
            <TouchableOpacity onPress={onChangeSizeClick}>
              <Text secondary>{ellipsis ? 'Expand' : 'Collapse'}</Text>
            </TouchableOpacity>
          </Block>
        </Block>
        <Block style={styles.dividerBlock}>
          <Divider />
        </Block>
        <Block paddingHorizontal={SIZES.padding}>
          <Block>
            <Text h3 bold>
              Hand-Picked Farmhouse Living Room Design Ideas Collection
            </Text>
          </Block>
        </Block>

        <Block padding={[SIZES.padding, 0]}>
          <ScrollView
            fadingEdgeLength={200}
            horizontal
            contentContainerStyle={{
              paddingLeft: SIZES.padding,
            }}>
            {collectionData?.designList?.map((item) => (
              <DesignCard key={item?._id} data={item} navigation={navigation} />
            ))}
          </ScrollView>
        </Block>
        {collectionData?._id && (
          <>
            <Block style={styles.dividerBlock}>
              <Divider />
            </Block>
            <Block paddingHorizontal={SIZES.padding} mb2>
              <Text h3>FAQ about {collectionData?.name}</Text>
            </Block>
            <Block padding={SIZES.padding}>
              <CollectionFAQs id={collectionData._id} />
            </Block>
          </>
        )}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  dividerBlock: {
    margin: SIZES.padding,
  },
  designCard: {
    borderRadius: SIZES.radius / 2,
    marginRight: SIZES.base,
    width: SIZES.width - 40 - SIZES.padding * 2,
  },
  designImageHolder: {
    height: 160,
    borderRadius: SIZES.radius / 2,
    width: '100%',
  },
  designCardImage: {
    borderRadius: SIZES.radius / 2,
    width: '100%',
    height: '100%',
  },
});

export default SingleCollection;
