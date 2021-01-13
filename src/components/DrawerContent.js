import {theme} from '@constants/index';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const {SIZES, COLORS} = theme;

export function DrawerContent({navigation, progress}) {
  const translateX = Animated.interpolate(progress, {
    inputRange: [0.5, 1],
    outputRange: [-50, 10],
  });
  const scale = Animated.interpolate(progress, {
    inputRange: [0.8, 1],
    outputRange: [0.9, 1],
  });
  return (
    <DrawerContentScrollView>
      <Block space="between" style={{height: SIZES.height - 100}}>
        <Block style={{margin: SIZES.padding, paddingTop: SIZES.padding}}>
          <Block>
            <Animated.Image
              source={{
                uri:
                  'https://media-exp1.licdn.com/dms/image/C5103AQGesJlA4slIRw/profile-displayphoto-shrink_400_400/0/1574104084714?e=1614816000&v=beta&t=WGahSsFe0iMtzaVYNSqbFROhw8hlga5PCh-45NMYm9k',
              }}
              resizeMode="cover"
              style={{
                height: 75,
                width: 75,
                borderRadius: 50,
                marginBottom: SIZES.padding / 2,
                transform: [{translateX, scale}],
              }}
            />
          </Block>
          <Block>
            <Text h2>Saurabh Sachan</Text>
            <Text caption color="gray">
              saurabh.sachan@spacejoy.com
            </Text>
          </Block>
        </Block>
        <Block flex={1.25} style={{margin: SIZES.padding}}>
          <Block style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('My Designs')}>
              <Text body>Design Orders</Text>
            </Button>
          </Block>
          <Block style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Store')}>
              <Text body>Store Orders</Text>
            </Button>
          </Block>
          <Block style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Profile')}>
              <Text body>My Profile</Text>
            </Button>
          </Block>
          <Block style={styles.navItem}>
            <Button raw onPress={() => navigation.navigate('Store')}>
              <Text body>Design Challenges</Text>
            </Button>
          </Block>
        </Block>
        <Block bottom flex={2}>
          <Text center color={COLORS.gray}>
            version: 1.0.0
          </Text>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  navItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SIZES.padding / 1.25,
  },
});
