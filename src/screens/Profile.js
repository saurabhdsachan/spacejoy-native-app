import { Block, Button, Text } from '@components/index';
import { images, theme } from '@constants/index';
import { AuthContext } from '@utils/helpers/withAuthContext';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const { SIZES, COLORS } = theme;

const Profile = ({ navigation }) => {
  const { data } = React.useContext(AuthContext);
  const { name = '', email = '', picture = '', channel } = data;
  return (
    <Block color={COLORS.white}>
      <Image source={images.onboarding2} resizeMode="cover" style={styles.designFeedImage} />
      <Block flex={2} center color={COLORS.semiTransparent}>
        <Block center row shadow card padding={SIZES.padding} color={COLORS.white} style={styles.container}>
          <Image source={{ uri: picture || images.defaultAvatar }} resizeMode="cover" style={styles.profileImage} />
          <Block>
            <Text h2 capitalize>
              {name}
            </Text>
            <Text small light>
              {email}
            </Text>
          </Block>
        </Block>
      </Block>
      <Block flex={1} padding={SIZES.padding}>
        <Block row center color={COLORS.white} card shadow flex={0.75}>
          <Block padding={SIZES.padding}>
            <Text small color={COLORS.gray} center>
              Designs
            </Text>
            <Text h1 center>
              098
            </Text>
          </Block>
          <Block padding={SIZES.padding}>
            <Text small color={COLORS.gray} center>
              Designs
            </Text>
            <Text h1 center>
              098
            </Text>
          </Block>
          <Block padding={SIZES.padding}>
            <Text small color={COLORS.gray} center>
              Followers
            </Text>
            <Text h1 center>
              817
            </Text>
          </Block>
        </Block>
      </Block>
      <Block flex={3} padding={SIZES.padding} row>
        <Block flex={6}>
          <Button ghost onPress={() => navigation.goBack()}>
            <Text center>Share</Text>
          </Button>
        </Block>
        <Block />
        <Block flex={6}>
          <Button gradient onPress={() => navigation.goBack()}>
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
  designFeedImage: {
    ...StyleSheet.absoluteFillObject,
    height: 180,
    width: '100%',
  },
  container: {
    marginTop: 120,
    width: SIZES.width * 0.9,
    maxHeight: 120,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: SIZES.radius / 1.5,
    marginRight: SIZES.padding,
  },
  buttonWrapper: {},
});

export default Profile;
