import {Block, Button, Radio, Text} from '@components/index';
import {images, theme} from '@constants/index';
import React from 'react';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const {sofa, lamp, chair, teddy} = images;

const Quiz1 = ({navigation}) => {
  return (
    <ScrollView style={{backgroundColor: COLORS.white}}>
      <Block
        padding={[
          SIZES.safe + 20,
          SIZES.padding,
          SIZES.padding,
          SIZES.padding,
        ]}>
        <StatusBar barStyle="dark-content" />
        <Text h2 mb2>
          Which space in your home are you looking to transform?
        </Text>
        <Block padding={[SIZES.padding, 0, SIZES.padding, 0]}>
          <Block row>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => alert('Living-room')}>
              <Block
                color="#DEE6E1"
                style={[styles.radioCard, styles.spaceRight, styles.full]}>
                <Radio
                  button={{
                    label: 'Living-room',
                    size: 18,
                    color: '#8DC395',
                    selected: true,
                  }}
                />
                <Text small>Get more productive</Text>
                <Image
                  source={sofa}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    right: -20,
                    height: 130,
                    width: '100%',
                  }}
                />
              </Block>
            </TouchableOpacity>
            <Block flex={1.5}>
              <Block
                middle
                color="#E5E5E5"
                style={[styles.radioCard, styles.spaceLeft, styles.half]}>
                <Radio
                  button={{
                    label: 'Bedroom',
                    size: 18,
                    color: '#979898',
                    selected: false,
                  }}
                  onClick={() => {}}
                />
                <Text small>Get more productive</Text>
                <Image
                  source={lamp}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    bottom: -20,
                    right: 0,
                    height: 80,
                    width: '45%',
                  }}
                />
              </Block>
              <Block
                middle
                color="#F6EEC7"
                style={[styles.radioCard, styles.spaceLeft, styles.half]}>
                <Radio
                  button={{
                    label: 'Study Room',
                    size: 18,
                    color: '#E7D682',
                    selected: false,
                  }}
                  onClick={() => {}}
                />
                <Text small>Get more productive</Text>
              </Block>
            </Block>
          </Block>
          <Block row>
            <Block
              middle
              color="#D9DCF7"
              style={[styles.radioCard, styles.spaceRight, styles.half]}>
              <Radio
                button={{
                  label: 'Home-Office',
                  size: 18,
                  color: '#7786B0',
                  selected: false,
                }}
                onClick={() => {}}
              />
              <Text small>Get more productive</Text>
            </Block>
            <Block
              middle
              color="#EBE6E4"
              style={[styles.radioCard, styles.spaceLeft, styles.half]}>
              <Radio
                button={{
                  label: 'Kid`s Room',
                  size: 18,
                  color: '#D9A7A6',
                  selected: false,
                }}
                onClick={() => {}}
              />
              <Text small>Get more productive</Text>
            </Block>
          </Block>
          <Block row>
            <Block flex={1.85}>
              <Block
                middle
                color="#BEEBE9"
                style={[styles.radioCard, styles.spaceRight, styles.half]}>
                <Radio
                  button={{
                    label: 'Nursery',
                    size: 18,
                    color: '#79D1CD',
                    selected: false,
                  }}
                  onClick={() => {}}
                />
                <Text small>More playful area</Text>
                <Image
                  source={teddy}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    bottom: -5,
                    right: 0,
                    height: 80,
                    width: '45%',
                  }}
                />
              </Block>
              <Block
                middle
                color="#FFF3E6"
                style={[styles.radioCard, styles.spaceRight, styles.half]}>
                <Radio
                  button={{
                    label: 'Entryway',
                    size: 18,
                    color: '#D7AB7A',
                    selected: false,
                  }}
                  onClick={() => {}}
                />
                <Text small>Get more productive</Text>
              </Block>
            </Block>
            <Block
              color="#F4DADA"
              style={[styles.radioCard, styles.spaceLeft, styles.full]}>
              <Radio
                button={{
                  label: 'Open Living',
                  size: 18,
                  color: '#D3B3B3',
                  selected: false,
                }}
                onClick={() => {}}
              />
              <Text small>Get more productive</Text>
              <Image
                source={chair}
                resizeMode="cover"
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: 0,
                  height: 120,
                  width: '80%',
                }}
              />
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
      </Block>
    </ScrollView>
  );
};

export default Quiz1;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
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
