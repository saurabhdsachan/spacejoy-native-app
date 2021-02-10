import { Block, Button, Text } from '@components/index';
import { images, theme } from '@constants/index';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Divider from './Divider';

const { SIZES, COLORS } = theme;

const ProfileCard = ({ user, uri }) => {
  const { name = '', email = '' } = user;
  return (
    <Block padding={SIZES.padding}>
      <Block center>
        <Image source={{ uri: uri || images.defaultAvatar }} resizeMode="cover" style={styles.profileImage} />
        <Block>
          <Text center h2 capitalize mt3 mb3>
            {name}
          </Text>
          <Text small light mb2 center>
            {email}
          </Text>
        </Block>
      </Block>
      <Divider />
      <Block row center color={COLORS.white} style={styles.highLight}>
        <Block padding={SIZES.padding}>
          <Text small center>
            Designs
          </Text>
          <Text h2 center>
            098
          </Text>
        </Block>
        <Block padding={SIZES.padding}>
          <Text small center>
            Designs
          </Text>
          <Text h2 center>
            098
          </Text>
        </Block>
        <Block padding={SIZES.padding}>
          <Text small center>
            Followers
          </Text>
          <Text h2 center>
            817
          </Text>
        </Block>
      </Block>

      <Block row>
        <Block flex={8}>
          <Button ghost onPress={() => {}}>
            <Text center>Share</Text>
          </Button>
        </Block>
        <Block />
        <Block flex={8}>
          <Button gradient onPress={() => {}}>
            <Text center color={COLORS.white}>
              Follow
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: SIZES.radius / 1.5,
    marginRight: SIZES.padding,
  },
  highLight: {
    marginBottom: SIZES.padding,
  },
});

export default ProfileCard;
