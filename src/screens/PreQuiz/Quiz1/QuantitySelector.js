import { SIZES } from '@constants/';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QuantitySelector = ({ borderColor, quantity, item }) => {
  const { addSelection, removeSelection } = React.useContext(DesignSelectionContext);
  return (
    <View style={[styles.viewStyles, { borderColor }]}>
      <TouchableOpacity onPress={() => removeSelection(item)} style={styles.btnStyles}>
        <Icon name="remove" size={18} color="#6D7278" />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={{ justifyContent: 'center' }}>
        <Text style={styles.txtStyles}>{quantity}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addSelection(item)} style={styles.btnStyles}>
        <Icon name="add" size={18} color="#6D7278" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyles: {
    borderRadius: SIZES.radius / 3,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'black',
    height: 30,
    marginVertical: 5,
    marginTop: 10,
  },
  btnStyles: {
    height: 28,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 9,
  },
  txtStyles: {
    color: '#6D7278',
    fontSize: 13,
    paddingHorizontal: 3,
  },
});

export default QuantitySelector;
