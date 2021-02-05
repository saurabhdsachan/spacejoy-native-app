import { images, theme } from '@constants/';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const { sofa } = images;

const { SIZES, COLORS } = theme;

const MarketingBanner = ({ navigation }) => {
  return (
    <Block middle center row style={styles.homeBanner}>
      <Block left padding={SIZES.padding}>
        <Text mb1 white>
          Get
        </Text>
        <Text title white>
          30%
        </Text>
        <Text mb1 white>
          Flat Off
        </Text>
        <Text small mb3 white>
          *on all design packages
        </Text>
        <Button color={COLORS.green} size="sm" onPress={() => navigation.navigate('NewAction')}>
          <Text white>
            Let&apos;s start <Icon name="arrow-forward" size={14} />
          </Text>
        </Button>
      </Block>
      <Block flex={1.5}>
        <Image resizeMode="contain" source={sofa} style={styles.homeBannerImage} />
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  homeBanner: {
    position: 'relative',
    height: '100%',
  },
  homeBannerImage: {
    height: '100%',
    width: '100%',
  },
});

export default MarketingBanner;
