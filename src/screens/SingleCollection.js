import {Block, Button, Text} from '@components/';
import Accordion from '@components/Accordion';
import Loader from '@components/Loader';
import {COLORS, SIZES} from '@constants/index';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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
  }, []);

  return (
    <Block>
      <Text h3 mb3 mt4>
        FAQ's
      </Text>
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
      onPress={() => navigation.navigate('Details', {feedItem: data})}>
      <Block style={styles.designCard}>
        <Image
          resizeMode="cover"
          style={styles.designCardImage}
          source={{
            uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto/${data?.cdnRender[0]}`,
          }}
        />
        <Block>
          <Text caption mt2 color={COLORS.red} transform={'capitalize'}>
            {data?.theme?.name}
          </Text>
          <Text numberOfLines={1} body>
            {data?.name}
          </Text>
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
        headerTitle: () => <Text h3>{collectionItem?.name}</Text>,
      });
    } else {
      navigation.setOptions({
        headerTitle: () => <></>,
      });
    }
  };

  return (
    <Block color={COLORS.white}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView scrollEventThrottle={20} onScroll={handleScroll}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,w_600,f_auto,h_400,ar_2,c_pad/${
                collectionItem.cdnThumbnail || collectionData.cdnCover
              }`,
            }}
            resizeMode="cover"
            style={{width: '100%', height: 190}}
          />
          <Block padding={SIZES.padding}>
            <Text h2 mb2>
              {collectionData?.name || collectionItem?.name}
            </Text>
            <Text small {...(ellipsis ? {numberOfLines: 3} : {})}>
              {collectionData?.description}
            </Text>
            <Button raw onPress={onChangeSizeClick}>
              <Text color={COLORS.primary1} mt2>
                {ellipsis ? 'Expand' : 'Collapse'}
              </Text>
            </Button>
          </Block>

          <Block color="#f3f3f3">
            <Block padding={SIZES.padding}>
              <Text h3 bold mb3>
                Hand-Picked Farmhouse Living Room Design Ideas Collection
              </Text>
              {collectionData?.designList?.map((item) => (
                <DesignCard
                  key={item?._id}
                  data={item}
                  navigation={navigation}
                />
              ))}
            </Block>
          </Block>
          {collectionData?._id && (
            <Block padding={SIZES.padding}>
              <CollectionFAQs id={collectionData._id} />
            </Block>
          )}
        </ScrollView>
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  dividerBlock: {
    margin: SIZES.padding,
  },
  designCard: {
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding * 1.5,
  },
  designCardImage: {
    borderRadius: SIZES.radius / 2,
    height: 200,
  },
});

export default SingleCollection;
