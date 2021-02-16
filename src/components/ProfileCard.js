import { Block, Text } from '@components/index';
import { images, theme } from '@constants/index';
import { elevationShadowStyle } from '@utils/styleHelper';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const { SIZES, COLORS } = theme;

const data = [
  {
    albumId: 1,
    id: 1,
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    url: 'https://via.placeholder.com/600/92c952',
    thumbnailUrl: 'https://via.placeholder.com/150/92c952',
  },
  {
    albumId: 1,
    id: 2,
    title: 'reprehenderit est deserunt velit ipsam',
    url: 'https://via.placeholder.com/600/771796',
    thumbnailUrl: 'https://via.placeholder.com/150/771796',
  },
  {
    albumId: 1,
    id: 3,
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    url: 'https://via.placeholder.com/600/24f355',
    thumbnailUrl: 'https://via.placeholder.com/150/24f355',
  },
  {
    albumId: 1,
    id: 4,
    title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    url: 'https://via.placeholder.com/600/d32776',
    thumbnailUrl: 'https://via.placeholder.com/150/d32776',
  },
  {
    albumId: 1,
    id: 5,
    title: 'natus nisi omnis corporis facere molestiae rerum in',
    url: 'https://via.placeholder.com/600/f66b97',
    thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
  },
  {
    albumId: 1,
    id: 6,
    title: 'accusamus ea aliquid et amet sequi nemo',
    url: 'https://via.placeholder.com/600/56a8c2',
    thumbnailUrl: 'https://via.placeholder.com/150/56a8c2',
  },
  {
    albumId: 1,
    id: 7,
    title: 'officia delectus consequatur vero aut veniam explicabo molestias',
    url: 'https://via.placeholder.com/600/b0f7cc',
    thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc',
  },
];

const ProfileCard = ({ user, uri }) => {
  const { name = '', email = '' } = user;
  return (
    <Block flex={false}>
      <Block row padding={SIZES.padding * 1.5}>
        <Block>
          <Block color={COLORS.white} center middle style={styles.profileImageWrapper}>
            <Image source={{ uri: images.defaultAvatar || uri }} resizeMode="cover" style={styles.profileImage} />
          </Block>
        </Block>
        <Block flex={1.5} middle>
          <Block>
            <Text small mt2>
              {email || 'Spacejoy'}
            </Text>
            <Text h2 mb2>
              {name}
            </Text>
          </Block>
          <Block row paddingVertical={SIZES.padding * 0.5} style={styles.profileStats}>
            <Block center middle>
              <Text small>Designs</Text>
              <Text h2>112</Text>
            </Block>
            <Block center middle>
              <Text small>Followers</Text>
              <Text h2>1000+</Text>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* <Block flex={false}>
        <Block paddingHorizontal={SIZES.padding * 1.5}>
          <Text h3 mb3>
            More Designs by {name}
          </Text>
        </Block>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          decelerationRate={0}
          scrollEventThrottle={16}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Block flex={false} row paddingLeft={SIZES.padding * 1.5}>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1611920630912-43e092ae5c17?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80' ||
                    item.url,
                }}
                resizeMode="cover"
                style={styles.moreDesigns}
              />
            </Block>
          )}
        />
      </Block> */}
    </Block>
  );
};

const styles = StyleSheet.create({
  profileImageWrapper: {
    ...elevationShadowStyle(1),
    height: 120,
    width: 120,
    borderRadius: SIZES.radius,
  },
  profileImage: {
    height: '100%',
    width: '100%',
    borderRadius: SIZES.radius / 2,
  },
  moreDesigns: {
    height: 180,
    width: 150,
    borderRadius: SIZES.radius,
  },
  profileStats: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray2,
  },
  highLight: {
    marginBottom: SIZES.padding,
  },
});

export default ProfileCard;
