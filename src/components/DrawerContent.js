import { images, theme } from '@constants/index';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AuthContext } from '@utils/helpers/withAuthContext';
import fbLogout from '@utils/LogoutManager/FbLogout';
import googleLogout from '@utils/LogoutManager/GoogleLogout';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const { SIZES, COLORS } = theme;

function DrawerContent({ navigation, progress }) {
  const { token, data, signOut } = React.useContext(AuthContext);
  const { name, email, picture, channel } = data;

  const handleSignOut = () => {
    if (channel === 'facebook') {
      fbLogout();
    } else if (channel === 'google') {
      googleLogout();
    }
    signOut();
    navigation.closeDrawer();
  };

  const translateX = Animated.interpolate(progress, {
    inputRange: [0.5, 1],
    outputRange: [80, 0],
  });
  const scale = Animated.interpolate(progress, {
    inputRange: [0.8, 1],
    outputRange: [0.95, 1],
  });

  return (
    <DrawerContentScrollView>
      <Block flex={false}>
        <Block flex={false} style={{ margin: SIZES.padding, paddingTop: SIZES.padding }}>
          {picture ? (
            <Block flex={false}>
              <Animated.Image
                source={{ uri: picture }}
                resizeMode="cover"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: SIZES.radius,
                  marginBottom: SIZES.padding / 2,
                  transform: [{ translateX, scale }],
                }}
              />
            </Block>
          ) : (
            <Block flex={false}>
              <Animated.Image
                source={{ uri: images.defaultAvatar }}
                resizeMode="cover"
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: SIZES.radius,
                  marginBottom: SIZES.padding / 2,
                  transform: [{ translateX, scale }],
                }}
              />
            </Block>
          )}
          <Block flex={false}>
            {name && (
              <Text h2 mt2>
                {name}
              </Text>
            )}
            {email && (
              <Text caption color="gray">
                {email}
              </Text>
            )}
          </Block>
        </Block>
        {token ? null : (
          <Block paddingHorizontal={SIZES.padding} row flex={false}>
            <Button raw onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
              <Text>Login</Text>
            </Button>
            <Block flex={false} marginHorizontal={SIZES.padding / 2}>
              <Text center middle>
                |
              </Text>
            </Block>
            <Button raw onPress={() => navigation.navigate('Auth', { screen: 'SignUp' })}>
              <Text>Sign up</Text>
            </Button>
          </Block>
        )}
        <Block flex={false} style={{ margin: SIZES.padding }}>
          <Block flex={false} animated style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Profile')}>
              <Text>
                <Icon name="person-outline" size={14} /> My Profile
              </Text>
            </Button>
          </Block>
          <Block flex={false} animated style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('My Designs')}>
              <Text>
                <Icon name="ios-image-outline" size={14} /> Design Orders
              </Text>
            </Button>
          </Block>
          <Block flex={false} animated style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Store')}>
              <Text>
                <Icon name="basket-outline" size={14} /> Store Orders
              </Text>
            </Button>
          </Block>
          {token && (
            <Block flex={false} animated style={styles.navItem}>
              <Button raw onPress={() => navigation.navigate('Ideabook')}>
                <Text>
                  <Icon name="bulb-outline" size={14} /> Ideabook
                </Text>
              </Button>
            </Block>
          )}
          {token && (
            <Block flex={false} animated style={styles.navItem}>
              <Button raw onPress={handleSignOut}>
                <Text>
                  <Icon name="md-walk-outline" size={14} /> Sign Out
                </Text>
              </Button>
            </Block>
          )}
        </Block>
        <Block flex={false}>
          <Text center color={COLORS.gray}>
            version: 1.0.0
          </Text>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  navItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SIZES.padding / 1.25,
  },
});
