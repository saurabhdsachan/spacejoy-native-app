import { theme } from '@constants/';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const { SIZES, COLORS } = theme;

const Radio = ({button, onClick, inline, bold}) => {
  const radioStyles = [styles.radioButton, inline && styles.inline];
  const labelStyles = [styles.label, inline && styles.labelInline];
  const BorderStyle = [
    {
      height: theme.SIZES.radio,
      width: theme.SIZES.radio,
      borderColor: button.selected ? COLORS.primary1 : 'black',
    },
  ];
  return (
    <Button raw onPress={() => onClick(button.value)}>
      <Block row style={radioStyles} center>
        <View style={[styles.radioButtonHolder, BorderStyle]}>
          {button.selected ? (
            <View
              style={[
                styles.radioIcon,
                {
                  height: theme.SIZES.radio / 2,
                  width: theme.SIZES.radio / 2,
                  backgroundColor: COLORS.primary1,
                },
              ]}
            />
          ) : null}
        </View>
        <Text
          transform="capitalize"
          style={[labelStyles, bold && styles.labelBold]}>
          {button.label}
        </Text>
      </Block>
    </Button>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radioButton: {
    marginVertical: (SIZES.padding * 2) / 3,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: SIZES.base,
  },
  labelInline: {
    marginTop: 0,
    marginLeft: SIZES.base,
  },
  labelBold: {
    fontWeight: 'bold',
  },
});
