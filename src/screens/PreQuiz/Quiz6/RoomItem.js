import { Block, Button, Text } from '@components/';
import { theme } from '@constants/';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown from './Dropdown';

const { COLORS, SIZES } = theme;

const RoomItem = ({
  data: { item, index },
  removeSelection,
  updateSelection,
  pricingItems,
  updateStorage,
  isEditable = true,
}) => {
  const getPrice = (packageName) => {
    let packagePrice = '';
    pricingItems.forEach((item) => {
      if (item.slug.toLowerCase() === packageName) {
        packagePrice = item?.salePrice.value;
      }
    });
    return packagePrice;
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
      <View style={styles.rightItem}>
        <Button onPress={() => removeSelection(item)}>
          <Animated.Text right white style={{ opacity, transform: [{ scale }], color: COLORS.white }}>
            Delete
          </Animated.Text>
        </Button>
      </View>
    );
  };
  const swipingOptions = isEditable ? rightItem : null;
  return (
    <Swipeable renderRightActions={rightItem}>
      <Block row spaceBetween middle color={COLORS.white} style={[styles.radioCard]}>
        <Block flex={5} middle>
          <Text>{item.title}</Text>
        </Block>
        <Block flex={4} end>
          {isEditable ? (
            <Dropdown
              data={pricingItems}
              onChange={(value) => {
                updateSelection(item, value, 'quiz1');
                updateStorage('quiz1');
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
                removeSelection(item, 'quiz1');
                updateStorage('quiz1');
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
    // paddingHorizontal: SIZES.padding,
    overflow: 'hidden',
  },
  rightItem: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

export default RoomItem;
