import { Block, Button, Radio, Text } from '@components/index';
import { theme } from '@constants/index';
import Budget from '@data/Quiz2.js';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const Quiz2 = ({ navigation }) => {
  return (
    <Block color={COLORS.white} padding={[SIZES.safe + 20, SIZES.padding, SIZES.padding, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2 mb3>
        What does your average budget look like?
      </Text>
      <Block flex={10}>
        <Block row wrap>
          {Budget.map((item, index) => (
            <Block key={item.name} color={item.bg} style={[styles.radioCard, index % 2 && styles.spaceLeft]}>
              <Radio
                inline
                bold
                button={{
                  label: item.displayName,
                  size: 22,
                  color: item.color,
                  selected: false
                }}
                onClick={() => {}}
              />
              <Text bold body mb1 mt2>
                {item.secondaryText}
              </Text>
              <Text small>{item.description}</Text>
            </Block>
          ))}
        </Block>
      </Block>
      <Block center flex={2} row space="between">
        <Button ghost color={COLORS.white} size="sm" onPress={() => navigation.goBack()}>
          <Text center>
            <Icon name="ios-arrow-back" size={14} /> Prev
          </Text>
        </Button>
        <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Quiz3')}>
          <Text center color={COLORS.white}>
            Next <Icon name="ios-arrow-forward" size={14} />
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Quiz2;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    flexBasis: 150
  },
  spaceRight: {
    marginRight: SIZES.padding
  },
  spaceLeft: {
    marginLeft: SIZES.padding
  },
  half: {
    minHeight: 80,
    height: 'auto'
  },
  full: {
    height: 190
  }
});
