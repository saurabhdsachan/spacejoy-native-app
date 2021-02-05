import { Block, Text } from '@components/index';
import { theme } from '@constants/index';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colorMap } from './fetchers';
const { SIZES, COLORS } = theme;

const PricingCard = ({ slug, data, cardWidth, firstCard, lastCard }) => {
  const { includedFeatures, excludedFeatures, description } = data;
  return (
    <Block style={{ width: cardWidth }}>
      <Block
        color={colorMap[slug].mild}
        style={[styles.swipeCard, firstCard && styles.firstCard, lastCard && styles.lastCard]}
        flex={false}
      >
        <Text h2 capitalize>
          {slug}
        </Text>
        <Text small mb2>
          {description}
        </Text>
        <Block row space="between" margin={[SIZES.base, 0, 0, 0]} flex={false}>
          <ScrollView bounces={false}>
            {includedFeatures.map((item) => {
              return (
                <Block center row key={item._id} paddingVertical={SIZES.base / 2}>
                  <Icon name="checkbox" size={SIZES.font * 1.5} color={COLORS.gray} />
                  <Text ml2>{item.label}</Text>
                </Block>
              );
            })}
            {excludedFeatures.map((item) => {
              return (
                <Block center row key={item._id} paddingVertical={SIZES.base / 2}>
                  <Icon name="close" size={SIZES.font * 1.5} color={COLORS.gray} />
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
export default React.memo(PricingCard);

const styles = StyleSheet.create({
  swipeCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding / 2,
  },
  firstCard: {
    marginLeft: SIZES.padding,
  },
  lastCard: {
    marginRight: SIZES.padding,
  },
});
