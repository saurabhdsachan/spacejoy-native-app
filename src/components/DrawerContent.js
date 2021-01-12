import {theme} from '@constants/index';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Block from './Block';
import Text from './Text';

const {SIZES, COLORS} = theme;

export function DrawerContent(props) {
  return (
    <Block>
      <DrawerContentScrollView {...props}>
        <Block style={{margin: SIZES.padding, paddingTop: SIZES.padding}}>
          <Block>
            <Image
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
        <Block style={{margin: SIZES.padding}}>
          <Block style={styles.navItem}>
            <Text body>Design Orders</Text>
          </Block>
          <Block style={styles.navItem}>
            <Text body>Store Orders</Text>
          </Block>
          <Block style={styles.navItem}>
            <Text body>My Profile</Text>
          </Block>
          <Block style={styles.navItem}>
            <Text body>Design Challenges</Text>
          </Block>
        </Block>
      </DrawerContentScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  navItem: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SIZES.padding / 1.25,
  },
});
