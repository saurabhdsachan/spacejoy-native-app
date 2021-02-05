import React from 'react';
import {Block, Button, Text} from '@components/index';
import {StyleSheet, ScrollView} from 'react-native';
import {theme} from '@constants/index';
const {SIZES, COLORS} = theme;
import Icon from 'react-native-vector-icons/Ionicons';
import {colorMap} from './fetchers';

const SPACING = 15 / 2;

const PricingCard = ({slug, data, cardWidth}) => {
  const {includedFeatures, excludedFeatures, description} = data;
  return (
    <Block style={{width: cardWidth}}>
      <Block
        color={colorMap[slug].mild}
        style={[styles.swipeCard]}
        flex={false}>
        <Text h2 style={{textTransform: 'capitalize'}} mb2>
          {slug}
        </Text>
        <Text small color="#6D7278">
          {description}
        </Text>
        <Block row space="between" margin={[SIZES.base, 0, 0, 0]} flex={false}>
          <ScrollView>
            {includedFeatures.map((item) => {
              return (
                <Block
                  center
                  row
                  key={item._id}
                  padding={[SIZES.base / 2, 0, SIZES.base / 2, 0]}>
                  <Icon
                    name="checkbox"
                    size={SIZES.font * 1.5}
                    color="#6D7278"
                  />
                  <Text ml1 regular color="#202325">
                    {item.label}
                  </Text>
                </Block>
              );
            })}
            {excludedFeatures.map((item) => {
              return (
                <Block
                  center
                  row
                  key={item._id}
                  padding={[SIZES.base / 2, 0, SIZES.base / 2, 0]}>
                  <Icon
                    name="close-circle"
                    size={SIZES.font * 1.5}
                    color="#6D7278"
                  />
                  <Text ml1 regular color="#202325">
                    {item.label}
                  </Text>
                </Block>
              );
            })}
          </ScrollView>
        </Block>
      </Block>
    </Block>
  );
};
export default PricingCard;

const styles = StyleSheet.create({
    swipeCard: {
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        overflow: 'hidden',
        marginBottom: SIZES.padding,
        marginHorizontal: SPACING,
      },
})
