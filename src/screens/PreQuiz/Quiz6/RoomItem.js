import { Block, Button, Text } from '@components/';
import { theme } from '@constants/';
import React from 'react';
import { StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import Dropdown from './Dropdown';

const { COLORS, SIZES } = theme;

const RightItem = () => (
  <Block middle center color={COLORS.yellow} paddingHorizontal={SIZES.padding}>
    <Text right white>
      Get{' '}
      <Text bold white>
        50% off
      </Text>{' '}
      on this room
    </Text>
  </Block>
);

const RoomItem = ({ data: { item, index }, removeSelection, updateSelection, pricingItems }) => {
  return (
    <Swipeable
      onSwipeableRightOpen={() => console.log('Swiped right')}
      renderRightActions={(progress, dragx) => <RightItem />}
    >
      <Block row spaceBetween middle color={COLORS.white} style={[styles.radioCard]}>
        <Block flex={5} middle>
          <Text>{item.title}</Text>
        </Block>
        <Block flex={4}>
          <Dropdown
            data={pricingItems}
            onChange={(value) => updateSelection(item, value)}
            value={item?.selectedPackage || item?.defaultSelection}
          />
        </Block>
        <Block flex={1} end>
          <Button raw onPress={() => removeSelection(item)}>
            <Icon name="remove-circle-outline" size={16} color={COLORS.red} />
          </Button>
        </Block>
      </Block>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding / 1.5,
    paddingHorizontal: SIZES.padding,
    overflow: 'hidden',
  },
});

export default RoomItem;
