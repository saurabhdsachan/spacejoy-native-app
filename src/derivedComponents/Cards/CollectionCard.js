import { Block, Text } from '@components/';
import { SIZES } from '@constants/';
import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ShareButton from '../ShareButton';

const CollectionCard = ({ data, navigation }) => {
  const [collectionData, setCollectionData] = useState(data);

  const onBookmarkChange = (value) => {
    setCollectionData({ ...collectionData, bookmarked: value });
  };

  return (
    <Block style={styles.collectionFeedCard} middle key={collectionData._id}>
      <Block style={styles.collectionFeedImageHolder}>
        <TouchableOpacity onPress={() => navigation.navigate('SingleCollection', { collectionItem: data })}>
          <Image
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,ar_1.55,c_pad/${collectionData.cdnThumbnail}`,
            }}
            resizeMode="cover"
            style={styles.collectionFeedImage}
          />
        </TouchableOpacity>
      </Block>
      <Block row spaceBetween end padding={[SIZES.padding, 0]}>
        <Block flex={11}>
          <Text numberOfLines={1} body>
            {collectionData.name}
          </Text>
        </Block>
        <Block row middle center flex={1}>
          <Block>
            <ShareButton
              message={collectionData.name}
              url={`https://www.spacejoy.com/interior-designs/${collectionData.slug}`}
              title={collectionData.name}
            />
          </Block>
          {/* <Block>
            <BookmarkButton
              id={collectionData._id}
              bookmarked={collectionData.bookmarked}
              onBookmarkChange={onBookmarkChange}
              type="collection"
            />
          </Block> */}
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  collectionFeedCard: {
    marginVertical: SIZES.base,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  collectionFeedImageHolder: {
    height: 175,
    width: '100%',
    borderRadius: SIZES.radius / 2,
    overflow: 'hidden',
  },
  collectionFeedImage: {
    height: '100%',
    width: '100%',
  },
});

export default CollectionCard;
