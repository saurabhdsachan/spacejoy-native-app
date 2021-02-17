import { Block, Button, Text } from '@components/';
import { SIZES } from '@constants/';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const animationConfig = {
  duration: 100,
  useNativeDriver: true,
};

const QuantitySelector = ({ borderColor, quantity, item }) => {
  const scale = useRef(new Animated.Value(0)).current;

  const { addSelection, removeSelection } = React.useContext(DesignSelectionContext);

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(scale, { ...animationConfig, toValue: 1 }).start();
    };
    const fadeOut = () => {
      Animated.timing(scale, { ...animationConfig, toValue: 0 }).start();
    };
    quantity === 0 ? fadeOut() : fadeIn();
  }, [quantity, scale]);

  return (
    <Block animated flex={false} style={[styles.wrapper, { borderColor, transform: [{ scale }] }]}>
      <Button raw onPress={() => removeSelection(item, 'quiz1')} style={styles.btnStyles}>
        <Icon name="remove" size={18} color="#6D7278" />
      </Button>
      <Button raw activeOpacity={1} style={{ justifyContent: 'center' }}>
        <Text bold style={styles.txtStyles}>
          {quantity}
        </Text>
      </Button>
      <Button raw onPress={() => addSelection(item, 'quiz1')} style={styles.btnStyles}>
        <Icon name="add" size={18} color="#6D7278" />
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  opacity: {
    opacity: 0,
  },
  wrapper: {
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
