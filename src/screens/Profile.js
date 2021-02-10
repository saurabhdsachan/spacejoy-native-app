import { Block, Button, Text } from '@components/index';
import { images, theme, webUrls } from '@constants/index';
import { AuthContext } from '@utils/helpers/withAuthContext';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const Profile = ({ navigation }) => {
  const { data } = React.useContext(AuthContext);
  const { name = '', email = '', picture = '', channel } = data;
  return (
    <Block color={COLORS.white}>
      <Image source={images.onboarding2} resizeMode="cover" style={styles.designFeedImage} />
      <Block flex={4} center>
        <Block card color={COLORS.white} style={styles.container}>
          <Block row center padding={SIZES.padding}>
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

          <Block row center card shadow color={COLORS.white}>
            <Block paddingHorizontal={SIZES.padding}>
              <Text small center>
                Designs
              </Text>
              <Text h1 center>
                098
              </Text>
            </Block>
            <Block paddingHorizontal={SIZES.padding}>
              <Text small center>
                Designs
              </Text>
              <Text h1 center>
                098
              </Text>
            </Block>
            <Block paddingHorizontal={SIZES.padding}>
              <Text small center>
                Followers
              </Text>
              <Text h1 center>
                817
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>

      <Block flex={1} padding={SIZES.padding} row>
        <Block flex={8}>
          <Button ghost onPress={() => navigation.goBack()}>
            <Text center>Share</Text>
          </Button>
        </Block>
        <Block />
        <Block flex={8}>
          <Button gradient onPress={() => navigation.goBack()}>
            <Text center color={COLORS.white}>
              Follow
            </Text>
          </Button>
        </Block>
      </Block>

      <Block flex={4} padding={SIZES.padding}>
        <Text h2 mb3>
          Policies
        </Text>
        {webUrls.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={styles.link}
            onPress={() => navigation.navigate('Browser', { data: item })}
          >
            <Block center middle row>
              <Block>
                <Text>{item.title}</Text>
              </Block>
              <Block>
                <Text right>
                  <Icon name="ios-chevron-forward-outline" size={14} />
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
        ))}
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  designFeedImage: {
    ...StyleSheet.absoluteFillObject,
    height: 280,
    width: '100%',
    borderRadius: SIZES.radius,
  },
  container: {
    marginTop: 100,
    width: SIZES.width * 0.9,
    maxHeight: 220,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: SIZES.radius / 1.5,
    marginRight: SIZES.padding,
  },
  link: {
    display: 'flex',
    height: SIZES.base * 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
  },
});

export default Profile;
