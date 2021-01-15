import {Block, Button, Radio, Text} from '@components/index';
import {images, theme} from '@constants/index';
import QuizData from '@data/Quiz3';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const {sofa, lamp, chair, teddy} = images;

const Quiz1 = ({navigation}) => {
  return (
    <Block
      color={COLORS.white}
      padding={[SIZES.safe + 20, SIZES.padding, SIZES.padding, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2>What's the occasion?</Text>
      <Block flex={18} padding={[SIZES.padding, 0, SIZES.padding, 0]}>
        <ScrollView>
          {QuizData.map((item) => (
            <Block
              middle
              color="#DEE6E1"
              key={item.title}
              style={styles.radioCard}>
              <Radio
                inline
                button={{
                  label: item.title,
                  size: 18,
                  color: item.bg,
                  selected: false,
                }}
              />
            </Block>
          ))}
        </ScrollView>
      </Block>
      <Block flex={2} center row space="between">
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
          onPress={() => navigation.navigate('Quiz2')}>
          <Text center color={COLORS.white}>
            Next <Icon name="ios-arrow-forward" size={14} />
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Quiz1;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    height: 90,
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
