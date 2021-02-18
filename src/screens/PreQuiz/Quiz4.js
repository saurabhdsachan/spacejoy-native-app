import { Block, Button, Radio, Text } from '@components/index';
import { images, theme } from '@constants/index';
import QuizData from '@data/Quiz4';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const { quiz4Banner } = images;
const quizTitle = 'quiz4';
const Quiz3 = ({ navigation }) => {
  const { userDesignSelections, userAnswers, saveUserAnswer } = React.useContext(DesignSelectionContext);
  const savedAnswerForThisStep = userAnswers[quizTitle];
  let doesUserHaveMoreThanSingleSelection = false;
  if (userDesignSelections.length) {
    if (userDesignSelections.length > 1) {
      doesUserHaveMoreThanSingleSelection = true;
    }
  }
  const navigateTo = doesUserHaveMoreThanSingleSelection ? 'Quiz6' : 'Quiz5';
  const handleChange = (value) => {
    saveUserAnswer(quizTitle, value);
  };
  return (
    <Block color={COLORS.white} padding={[SIZES.safe + 200, SIZES.padding, 0, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Image source={quiz4Banner} style={styles.imageBg} />
      <Text h2>When should your space be ready?</Text>
      <Text mt1>A timeline will help us work towards your goal</Text>
      <ScrollView bounces={false}>
        {QuizData.map((item, index) => (
          <Block
            middle
            key={item.title}
            style={[
              styles.radioCard,
              index === QuizData.length - 1 && styles.lastChild,
              index === 0 && styles.firstChild,
            ]}
          >
            <Radio
              inline
              button={{
                label: item.title,
                size: 18,
                color: COLORS[item.bg],
                selected: savedAnswerForThisStep === item.title,
                value: item.title,
              }}
              onChange={handleChange}
            />
          </Block>
        ))}
      </ScrollView>

      <Block center row space="between" style={styles.bottomButtons}>
        <Button ghost color={COLORS.white} size="sm" onPress={() => navigation.goBack()}>
          <Text center>
            <Icon name="ios-arrow-back" size={14} /> Prev
          </Text>
        </Button>
        <Button
          color={COLORS.black}
          size="sm"
          onPress={() => {
            navigation.navigate(navigateTo);
          }}
        >
          <Text center color={COLORS.white}>
            Next <Icon name="ios-arrow-forward" size={14} />
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Quiz3;

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.padding / 1.5,
  },
  lastChild: {
    borderBottomWidth: 0,
  },
  firstChild: {
    marginTop: SIZES.padding,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
  imageBg: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    left: SIZES.width * 0.25,
    height: 350,
    width: SIZES.width * 0.5,
  },
});
