import { Block, Button, Radio, Text } from '@components/index';
import { images, theme } from '@constants/index';
import Budget from '@data/Quiz2.js';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const { sofa, lamp, chair, teddy } = images;

const Quiz2 = ({ navigation }) => {
  const handleChange = (value) => {
    alert(value);
  };

  return (
    <Block color={COLORS.white} padding={[SIZES.safe + 20, SIZES.padding, SIZES.padding, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2 mb3>
        What does your average budget look like?
      </Text>
      <Block flex={18} padding={[SIZES.padding, 0, SIZES.padding, 0]}>
        <ScrollView bounces={false}>
          <Block row wrap>
            {Budget.map((item, index) => (
              <Block key={item.name} color={item.bg} style={[styles.radioCard, index % 2 && styles.spaceLeft]}>
                <Radio
                  inline
                  onChange={handleChange}
                  bold
                  button={{
                    label: item.displayName,
                    value: item.displayName,
                    size: 18,
                    color: item.color,
                    selected: true
                  }}
                />
                <Text bold body mb1 mt2>
                  {item.secondaryText}
                </Text>
                <Text small>{item.description}</Text>
              </Block>
            ))}
          </Block>
        </ScrollView>
      </Block>
      <Block flex={2} center row space="between">
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
    marginBottom: SIZES.padding,
    flexBasis: 150,
    minHeight: 180,
    height: 'auto'
  },
  spaceLeft: {
    marginLeft: SIZES.padding
  }
});
