import { Block, Radio } from '@components/index';
import { theme } from '@constants/index';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Quantity from './QuantitySelector';

const { SIZES } = theme;
const QuizCard = ({ data, stylesArray, align, inline }) => {
  const { addSelection } = React.useContext(DesignSelectionContext);

  const { blockColor, radioColor, title, quantity } = data;
  const alignMiddle = { ...(align && { middle: true }) };
  const isInline = { ...(inline ? { inline: true } : { inline: false }) };
  const select = () => {
    console.log('this is fired');
    if (!data.quantity) {
      addSelection(data);
    }
  };

  return (
    // <TouchableOpacity activeOpacity={0.8} onPress={() => select(data.id)}>
    <Block color={blockColor} style={stylesArray} {...alignMiddle}>
      <TouchableOpacity style={styles.buttonStyles} onPress={() => select(data.id)}>
        <Radio
          bold
          onChange={() => {}}
          {...isInline}
          button={{
            label: title,
            size: 18,
            color: radioColor,
            selected: !!quantity,
          }}
        />
        {quantity > 0 && (
          <Quantity
            borderColor={radioColor}
            quantity={data.quantity || data.defaultQuantity}
            item={data}
            type="quiz"
            selections={data.selections}
          />
        )}
        {data.image ? <Image source={data.image} resizeMode="cover" style={styles[data.slug]} /> : null}
      </TouchableOpacity>
    </Block>
  );
};
const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
  },
  buttonStyles: {
    height: '100%',
    width: '100%',
    padding: SIZES.padding,
  },
  livingRoom: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    height: 130,
    width: '100%',
  },
  bedRoom: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    height: 80,
    width: '45%',
  },
  nursery: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    height: 80,
    width: '45%',
  },
  openLiving: {
    position: 'absolute',
    bottom: -10,
    right: 0,
    height: 120,
    width: '80%',
  },
  spaceRight: {
    marginRight: SIZES.padding / 2,
  },
  spaceLeft: {
    marginLeft: SIZES.padding / 2,
  },
  half: {
    minHeight: 80,
    height: 'auto',
  },
  full: {
    height: 190,
  },
});

export default QuizCard;
