/* eslint-disable react-hooks/exhaustive-deps */
import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import QuizCard from './QuizCard';
import quiz from './quizData';

const { SIZES, COLORS } = theme;

const Quiz1 = ({ navigation }) => {
  const [quizData, setQuizRenderData] = useState([...quiz]);
  const { userDesignSelections } = React.useContext(DesignSelectionContext);
  const setSelection = (id) => {
    const updatedSelections = quizData.map((item) => {
      if (item.id === id) {
        return { ...item, selected: true };
      }
      return { ...item };
    });
    setQuizRenderData(updatedSelections);
  };

  useEffect(() => {
    if (userDesignSelections.length) {
      const designSelectionMap = {};
      for (let i = 0; i < userDesignSelections.length; i++) {
        if (designSelectionMap[userDesignSelections[i].id]) {
          designSelectionMap[userDesignSelections[i].id].push(userDesignSelections[i]);
        } else {
          designSelectionMap[userDesignSelections[i].id] = [];
          designSelectionMap[userDesignSelections[i].id].push(userDesignSelections[i]);
        }
      }

      const updatedData = [...quizData].map((quizItem) => {
        if (designSelectionMap[quizItem.id]) {
          console.log(designSelectionMap[quizItem.id]);
          return { ...quizItem, quantity: designSelectionMap[quizItem.id].length };
        } else {
          return { ...quizItem, quantity: 0 };
        }
      });
      setQuizRenderData(updatedData);
    } else {
      setQuizRenderData(quiz);
    }
  }, [userDesignSelections]);
  return (
    <Block color={COLORS.white} padding={[SIZES.safe + 20, SIZES.padding, SIZES.padding, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2>Which space in your home are you looking to transform?</Text>
      <Block flex={18} padding={[SIZES.padding, 0, SIZES.padding, 0]}>
        <ScrollView>
          <Block row>
            <QuizCard
              data={quizData[0]}
              stylesArray={[styles.radioCard, styles.spaceRight, styles.full]}
              select={setSelection}
              inline={false}
            />
            <Block flex={1.5}>
              <QuizCard
                data={quizData[1]}
                stylesArray={[styles.radioCard, styles.spaceLeft, styles.half]}
                align
                select={setSelection}
                inline
              />
              <QuizCard
                data={quizData[2]}
                stylesArray={[styles.radioCard, styles.spaceLeft, styles.half]}
                align
                select={setSelection}
                inline
              />
            </Block>
          </Block>
          <Block row>
            <QuizCard
              data={quizData[3]}
              stylesArray={[styles.radioCard, styles.spaceRight, styles.half]}
              middle
              select={setSelection}
              inline
            />
            <QuizCard
              data={quizData[4]}
              stylesArray={[styles.radioCard, styles.spaceLeft, styles.half]}
              middle
              select={setSelection}
              inline
            />
          </Block>
          <Block row>
            <Block flex={1.85}>
              <QuizCard
                data={quizData[5]}
                stylesArray={[styles.radioCard, styles.spaceRight, styles.half]}
                middle
                select={setSelection}
                inline
              />
              <QuizCard
                data={quizData[6]}
                stylesArray={[styles.radioCard, styles.spaceRight, styles.half]}
                middle
                select={setSelection}
                inline
              />
            </Block>
            <QuizCard
              data={quizData[7]}
              stylesArray={[styles.radioCard, styles.spaceLeft, styles.full]}
              middle
              select={setSelection}
              inline={false}
            />
          </Block>
        </ScrollView>
      </Block>
      <Block flex={2} center row space="between">
        <Button ghost color={COLORS.white} size="sm" onPress={() => navigation.goBack()}>
          <Text center>
            <Icon name="ios-arrow-back" size={14} /> Prev
          </Text>
        </Button>
        <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Quiz2')}>
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
    minHeight: 70,
    height: 'auto',
  },
  full: {
    height: 220,
  },
});
