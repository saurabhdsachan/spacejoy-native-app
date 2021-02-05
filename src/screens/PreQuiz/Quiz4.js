import { Block, Button, Radio, Text } from '@components/index';
import { theme } from '@constants/index';
import QuizData from '@data/Quiz4';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const Quiz3 = ({ navigation }) => {
  const { userDesignSelections } = React.useContext(DesignSelectionContext);
  let doesUserHaveMoreThanSingleSelection = false;
  if (userDesignSelections.length) {
    if (userDesignSelections.length > 1) {
      doesUserHaveMoreThanSingleSelection = true;
    } else if (userDesignSelections[0].quantity > 1) {
      doesUserHaveMoreThanSingleSelection = true;
    }
  }
  const navigateTo = doesUserHaveMoreThanSingleSelection ? 'Quiz6' : 'Quiz5';
  return (
    <Block color={COLORS.white} padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2>When should your space be ready?</Text>
      <Text small>A timeline will help us work towards your goal</Text>
      <ScrollView>
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
                color: item.bg,
                selected: false,
              }}
            />
          </Block>
        ))}
      </ScrollView>
      <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
        <Block center row space="between">
          <Button ghost color={COLORS.white} size="sm" onPress={() => navigation.goBack()}>
            <Text center>
              <Icon name="ios-arrow-back" size={14} /> Prev
            </Text>
          </Button>
          <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate(navigateTo)}>
            <Text center color={COLORS.white}>
              Next <Icon name="ios-arrow-forward" size={14} />
            </Text>
          </Button>
        </Block>
      </LinearGradient>
    </Block>
  );
};

export default Quiz3;

const styles = StyleSheet.create({
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden',
  },
  lastChild: {
    borderBottomWidth: 0,
    marginBottom: 150,
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
});
