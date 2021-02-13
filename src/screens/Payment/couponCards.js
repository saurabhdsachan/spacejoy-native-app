import { Block, Button } from '@components/index';
import { theme } from '@constants/index';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const CouponCard = ({ title, description, code, firstCard, lastCard }) => {
  const validateCoupon = async () => {};
  return (
    <Block color="#f2f2f2" padding={SIZES.padding} style={[styles.swipeCard]}>
      <Text regular style={[styles.couponCode, styles.textStyles]} h2 transform="uppercase">
        <Icon name="pricetag-outline" size={14} style={styles.icon} /> {code}
      </Text>
      <Text style={[styles.textStyles, styles.couponTitle]}>{title}</Text>
      <Text style={[styles.textStyles]}>{description}</Text>
      <Button size="sm" ghost style={{ alignSelf: 'flex-start', borderRadius: 1 }} onPress={validateCoupon}>
        <Text>Use</Text>
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  couponTitle: {
    fontWeight: 'bold',
  },
  couponCode: {
    backgroundColor: 'rgb(254, 247, 239)',
    padding: SIZES.padding / 3,
    alignSelf: 'flex-start',
    color: '#F39C12',
    textTransform: 'uppercase',
    borderColor: 'rgb(254, 247, 239)',
    borderWidth: 4,
    borderRadius: 1,
  },
  textStyles: {
    marginVertical: SIZES.padding / 3,
  },
  swipeCard: {
    padding: SIZES.padding,
    // marginHorizontal: SIZES.padding / 2,
    marginVertical: SIZES.padding / 2,
  },
  firstCard: {
    marginLeft: SIZES.padding,
  },
  lastCard: {
    marginRight: SIZES.padding,
  },
});
export default CouponCard;
