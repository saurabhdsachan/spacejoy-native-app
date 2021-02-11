import { images, theme } from '@constants/index';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AuthContext } from '@utils/helpers/withAuthContext';
import fbLogout from '@utils/LogoutManager/FbLogout';
import googleLogout from '@utils/LogoutManager/GoogleLogout';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const { SIZES, COLORS } = theme;

function DrawerContent({ navigation, progress }) {
  const { token, data, signOut } = React.useContext(AuthContext);
  const { name = '', email = '', picture = '', channel } = data;
  const handleSignOut = () => {
    console.log('sign out pressed');
    if (channel === 'facebook') {
      fbLogout();
    } else if (channel === 'google') {
      googleLogout();
    }
    // sings out of local app state
    signOut();
    navigation.closeDrawer();
  };
  const translateX = Animated.interpolate(progress, {
    inputRange: [0.5, 1],
    outputRange: [70, 0],
  });
  const scale = Animated.interpolate(progress, {
    inputRange: [0.8, 1],
    outputRange: [0.9, 1],
  });
  return (
    <DrawerContentScrollView>
      <Block flex={false}>
        <Block flex={false} style={{ margin: SIZES.padding, paddingTop: SIZES.padding }}>
          <Block flex={false}>
            <Animated.Image
              source={{ uri: picture || images.defaultAvatar }}
              resizeMode="cover"
              style={{
                height: 75,
                width: 75,
                borderRadius: SIZES.radius,
                marginBottom: SIZES.padding / 2,
                transform: [{ translateX, scale }],
              }}
            />
          </Block>
          <Block flex={false}>
            <Text h2 mt2>
              {name}
            </Text>
            <Text caption color="gray">
              {email}
            </Text>
          </Block>
        </Block>
        <Block flex={false} style={{ margin: SIZES.padding }}>
          <Block flex={false} style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Profile')}>
              <Text body>My Profile</Text>
            </Button>
          </Block>
          <Block flex={false} style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('My Designs')}>
              <Text body>Design Orders</Text>
            </Button>
          </Block>
          <Block flex={false} style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Store')}>
              <Text body>Store Orders</Text>
            </Button>
          </Block>
          {token && (
            <Block flex={false} style={styles.navItem}>
              <Button raw onPress={() => navigation.navigate('Ideabook')}>
                <Text body>Ideabook</Text>
              </Button>
            </Block>
          )}
          {token && (
            <Block flex={false} style={styles.navItem}>
              <Button raw onPress={handleSignOut}>
                <Text body>Sign Out</Text>
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
