import {Block, Button, Text} from '@components/index';
import {theme} from '@constants/index';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const Quiz1 = ({navigation}) => {
  return (
    <Block
      color={COLORS.white}
      padding={[SIZES.safe + 20, SIZES.padding, SIZES.padding, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Text h2 mb2>
          Which space in your home are you looking to transform?
        </Text>
        <Block padding={[SIZES.padding, 0, SIZES.padding, 0]}>
          <Block row>
            <Block color="#DEE6E1" style={[styles.radioCard, styles.full]}>
              <Text body>Living Room</Text>
              <Text small>Get more productive</Text>
            </Block>
            <Block flex={2}>
              <Block
                middle
                color="#E5E5E5"
                style={[styles.radioCard, styles.half]}>
                <Text body>Bedroom</Text>
                <Text small>Get more productive</Text>
              </Block>
              <Block
                middle
                color="#F6EEC7"
                style={[styles.radioCard, styles.half]}>
                <Text body>Study Room</Text>
                <Text small>Get more productive</Text>
              </Block>
            </Block>
          </Block>
          <Block row>
            <Block
              middle
              color="#D9DCF7"
              style={[styles.radioCard, styles.half]}>
              <Text body>Home-Office</Text>
              <Text small>Get more productive</Text>
            </Block>
            <Block
              middle
              color="#EBE6E4"
              style={[styles.radioCard, styles.half]}>
              <Text body>Kid's Room</Text>
              <Text small>Get more productive</Text>
            </Block>
          </Block>
          <Block row>
            <Block flex={2}>
              <Block
                middle
                color="#BEEBE9"
                style={[styles.radioCard, styles.half]}>
                <Text body>Nursery</Text>
                <Text small>Get more productive</Text>
              </Block>
              <Block
                middle
                color="#FFF3E6"
                style={[styles.radioCard, styles.half]}>
                <Text body>Entryway</Text>
                <Text small>Get more productive</Text>
              </Block>
            </Block>
            <Block color="#F4DADA" style={[styles.radioCard, styles.full]}>
              <Text body>Open Living</Text>
              <Text small>Get more productive</Text>
            </Block>
          </Block>
          <Block
            row
            space="between"
            margin={[SIZES.padding, 0, SIZES.padding, 0]}>
            <Button
              ghost
              color={COLORS.white}
              size="sm"
              onPress={() => navigation.goBack()}>
              <Text center>
                <Icon name="ios-arrow-back" size={14} /> Prev
              </Text>
            </Button>
            <Button
              color={COLORS.black}
              size="sm"
              onPress={() => navigation.navigate('Quiz1')}>
              <Text center color={COLORS.white}>
                Next <Icon name="ios-arrow-forward" size={14} />
              </Text>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default Quiz1;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    margin: SIZES.padding / 2,
    padding: SIZES.padding,
    overflow: 'hidden',
  },
  half: {
    minHeight: 80,
    height: 'auto',
  },
  full: {
    height: 180,
  },
});
