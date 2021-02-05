import { theme } from '@constants/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import Block from './Block';
import Radio from './Radio';

const { SIZES, COLORS } = theme;

const DesignCard = ({ index, item }) => {
  return (
    <Block middle key={item.title} style={styles.radioCard}>
      <Radio
        inline
        button={{
          label: item.title,
          size: 18,
          color: item.bg,
          selected: false,
        }}
      />
    </Block>
  );
};

export default DesignCard;

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden',
  },
});
