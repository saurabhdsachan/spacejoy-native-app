import { Block, Button, Text } from '@components/';
import { theme } from '@constants/';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown from './Dropdown';

const { COLORS, SIZES } = theme;
const ANIMATION_DURATION = 150;

const RoomItem = ({
  data: { item, index },
  removeSelection,
  updateSelection,
  pricingItems,
  updateStorage,
  isEditable = true,
  lastChild,
}) => {
  const animated = new Animated.Value(1);
  const getPrice = (packageName) => {
    let packagePrice = '';
    pricingItems.forEach((priceItem) => {
      if (priceItem.slug.toLowerCase() === packageName) {
        packagePrice = priceItem?.salePrice.value;
      }
    });
    return packagePrice;
  };
  const animateAndDeleteRow = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      removeSelection(item, 'quiz1');
    });
  };
  const rightItem = (progress, dragX) => {
    const scale = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
      extrapolate: 'clamp',
    });
    const opacity = progress.interpolate({
      inputRange: [0.7, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <Block flex={false} style={styles.rightItem}>
        <Button onPress={() => removeSelection(item, 'quiz1')}>
          <Animated.Text right white style={{ opacity, transform: [{ scale }], color: COLORS.white }}>
            Delete
          </Animated.Text>
        </Button>
      </Block>
    );
  };
  return (
    <Swipeable renderRightActions={rightItem}>
      <Block
        row
        spaceBetween
        middle
        animated
        color={COLORS.white}
        style={[
          styles.radioCard,
          lastChild && styles.lastChild,
          { opacity: animated },
          {
            transform: [{ scale: animated }],
          },
        ]}
      >
        <Block flex={5} middle>
          <Text>{item.title}</Text>
        </Block>
        <Block flex={4} end>
          {isEditable ? (
            <Dropdown
              data={pricingItems}
              onChange={(value) => {
                updateSelection(item, value, 'quiz1');
                // updateStorage('quiz1');
              }}
              value={item?.selectedPackage || item?.defaultSelection}
            />
          ) : (
            <Text color="black" style={{ textAlign: 'right' }} transform="capitalize">
              {item?.selectedPackage || item?.defaultSelection}{' '}
              {` $${getPrice(item?.selectedPackage || item?.defaultSelection)}`}
            </Text>
          )}
        </Block>
        {removeSelection ? (
          <Block flex={1} end>
            <Button
              raw
              onPress={() => {
                animateAndDeleteRow();
              }}
            >
              <Icon name="remove-circle-outline" size={16} color={COLORS.red} />
            </Button>
          </Block>
        ) : null}
      </Block>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding / 1.2,
    paddingHorizontal: SIZES.padding,
    overflow: 'hidden',
  },
  lastChild: {
    borderBottomWidth: 0,
  },
  rightItem: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

export default RoomItem;
