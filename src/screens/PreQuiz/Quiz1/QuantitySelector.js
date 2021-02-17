import { Block, Button } from '@components/';
import { COLORS, SIZES } from '@constants/';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const QuantitySelector = ({ borderColor, quantity, item }) => {
  const { addSelection, removeSelection } = React.useContext(DesignSelectionContext);
  return (
    <Block flex={false} style={[styles.viewStyles, { borderColor }, quantity === 0 && styles.opacity]}>
      <Button raw onPress={() => removeSelection(item, 'quiz1')} style={styles.btnStyles}>
        <Icon name="remove" size={18} color={COLORS.gray} />
      </Button>
      <Button raw activeOpacity={1} style={{ justifyContent: 'center' }}>
        <Text style={styles.txtStyles}>{quantity}</Text>
      </Button>
      <Button raw onPress={() => addSelection(item, 'quiz1')} style={styles.btnStyles}>
        <Icon name="add" size={18} color={COLORS.gray} />
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  opacity: {
    opacity: 0,
  },
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
