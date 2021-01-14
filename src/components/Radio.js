import {theme} from '@constants/';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const {SIZES, COLORS} = theme;

const Radio = ({button, onClick}) => {
  return (
    <View style={styles.radioButton}>
      <View
        style={[
          styles.radioButtonHolder,
          {
            height: button.size,
            width: button.size,
            borderColor: button.color,
          },
        ]}>
        {button.selected ? (
          <View
            style={[
              styles.radioIcon,
              {
                height: button.size / 2,
                width: button.size / 2,
                backgroundColor: button.color,
              },
            ]}
          />
        ) : null}
      </View>
      <Text style={[styles.label]}>{button.label}</Text>
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    marginBottom: SIZES.base / 2,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: SIZES.base,
  },
});
