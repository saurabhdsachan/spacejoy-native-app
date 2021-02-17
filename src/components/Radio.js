import { theme } from '@constants/';
import React from 'react';
import { StyleSheet } from 'react-native';
import Block from './Block';
import Button from './Button';
import Text from './Text';

const { SIZES, COLORS } = theme;

const Radio = ({ button, onChange, inline, bold, children }) => {
  const radioStyles = [styles.radioButton, inline && styles.inline];
  const labelStyles = [styles.label, inline && styles.labelInline, bold && styles.labelBold];
  return (
    <Button raw onPress={() => onChange && onChange(button.value)} style={radioStyles}>
      <Block row={inline} center={inline} flex={false}>
        <Block
          flex={false}
          style={[
            styles.radioButtonHolder,
            {
              height: button.size || SIZES.base * 3,
              width: button.size || SIZES.base * 3,
              borderColor: button.color || COLORS.primary1,
            },
          ]}
        >
          {button.selected && (
            <Block
              flex={false}
              style={[
                styles.radioIcon,
                {
                  height: button.size / 2 || SIZES.base * 2.25,
                  width: button.size / 2 || SIZES.base * 2.25,
                  backgroundColor: button.color || COLORS.primary1,
                },
              ]}
            />
          )}
        </Block>
        <Text size={SIZES.h3} style={labelStyles}>
          {button.label}
        </Text>
        <Block flex={50}>{children}</Block>
      </Block>
    </Button>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radioButton: {
    marginBottom: SIZES.base / 2,
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonHolder: {
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIcon: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: SIZES.base,
    zIndex: 1,
    height: 20,
  },
  labelInline: {
    marginTop: 0,
    marginLeft: SIZES.base,
  },
  labelBold: {
    fontWeight: 'bold',
  },
});
