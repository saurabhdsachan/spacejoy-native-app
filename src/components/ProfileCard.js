import { Block, Text } from '@components/index';
import { images, theme } from '@constants/index';
import { MILD } from '@constants/theme';
import { elevationShadowStyle } from '@utils/styleHelper';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const { SIZES, COLORS } = theme;

const ProfileCard = ({ user, uri }) => {
  const { name = '', email = '' } = user;
  return (
    <Block flex={false}>
      <LinearGradient colors={[MILD.red, COLORS.white]} style={styles.gradient} />
      <Block row padding={SIZES.padding * 1.5}>
        <Block>
          <Block color={COLORS.white} center middle style={styles.profileImageWrapper}>
            <Image source={{ uri: images.defaultAvatar }} resizeMode="cover" style={styles.profileImage} />
          </Block>
        </Block>
        <Block flex={1.5}>
          <Block>
            <Text>{email || 'Spacejoy'}</Text>
            <Text h2 mb2>
              {name}
            </Text>
          </Block>
          <Block row color={COLORS.white} padding={SIZES.padding} style={styles.profileStats}>
            <Block center middle>
              <Text small center>
                Designs
              </Text>
              <Text h2 center>
                112
              </Text>
            </Block>
            <Block center middle>
              <Text small center>
                Followers
              </Text>
              <Text h2 center>
                1000+
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
      <Block flex={false} paddingHorizontal={SIZES.padding * 1.5}>
        <Text color={COLORS.gray}>More Designs by {name}</Text>
        <FlatList horizontal pagingEnabled scrollEnabled decelerationRate={0} scrollEventThrottle={16} />
      </Block>
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
  profileStats: {
    ...elevationShadowStyle(1),
    borderRadius: SIZES.radius,
  },
  highLight: {
    marginBottom: SIZES.padding,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    top: 120,
    height: SIZES.height,
  },
});

export default ProfileCard;
