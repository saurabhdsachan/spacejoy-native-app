import { SIZES } from '@constants/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const Marketing = ({ navigation }) => {
  return (
    <Block row center style={styles.shopThisLook}>
      <Block flex={2} padding={SIZES.padding}>
        <Text h2 mb2>
          Online Interior Design Services By Spacejoy
        </Text>
        <Text small mb2>
          Hire our design export to transform your room. Shop handpicked products within your budget and style, directly
          from your room design.
        </Text>

        <Text bold mb2>
          Packages starting from $99.00
        </Text>

        <Block row>
          <Button size="sm" color="black" onPress={() => navigation.navigate('NewAction')}>
            <Text small color="white">
              Start Your Project
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default Marketing;

const styles = StyleSheet.create({
  shopThisLook: {
    backgroundColor: '#f8e7ff',
  },
});
