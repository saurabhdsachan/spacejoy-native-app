import { Block, Text } from '@components/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentScreenHeader = () => {
  return (
    <Block row spaceBetween>
      <Block flex={5}>
        <Text h2>Secure Checkout</Text>
        <Text>Powered by Stripe</Text>
      </Block>
      <Block flex={2} middle center>
        <Text mt2 style={styles.smallText} bold small>
          VERIFIED &
        </Text>
        <Text style={styles.smallText} bold small>
          SECURED
        </Text>
        <Icon name="lock-closed" size={12} />
        <Block row>
          <Icon name="star-outline" size={8} />
          <Icon name="star-outline" size={8} />
          <Icon name="star-outline" size={8} />
        </Block>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  smallText: {
    fontSize: 8,
    lineHeight: 8,
    textAlign: 'center',
  },
});

export default PaymentScreenHeader;
