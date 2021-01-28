import {images, SIZES} from '@constants/index';
import React from 'react';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Button from './Button';

const HeaderLeft = ({navigation, hasLogo}) => (
  <Block center row>
    <Button raw onPress={navigation.toggleDrawer}>
      <Icon
        size={25}
        name="ios-reorder-two-outline"
        style={{marginHorizontal: SIZES.padding}}
      />
    </Button>
    {hasLogo && (
      <Image
        source={images.logo}
        resizeMode="cover"
        style={{
          height: 25,
          width: 108,
          marginRight: SIZES.base,
        }}
      />
    )}
  </Block>
);

export default HeaderLeft;
