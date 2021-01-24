import {HeaderBack} from '@components/index';
import {COLORS} from '@constants/index';
import {createStackNavigator} from '@react-navigation/stack';
import DesignService from '@screens/DesignService';
import NewAction from '@screens/NewAction';
import Quiz1 from '@screens/PreQuiz/Quiz1';
import Quiz2 from '@screens/PreQuiz/Quiz2';
import Quiz3 from '@screens/PreQuiz/Quiz3';
import Quiz4 from '@screens/PreQuiz/Quiz4';
import React from 'react';

const Stack = createStackNavigator();

const QuizScreenHeaderOptions = {
  title: null,
  headerTransparent: true,
  headerBackImage: () => <HeaderBack />,
  headerBackTitleVisible: false,
  headerBackTitleStyle: {
    color: COLORS.black,
  },
};

const NewActionStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewAction"
        component={NewAction}
        options={{headerShown: false, title: null}}
      />
      <Stack.Screen
        name="DesignService"
        component={DesignService}
        options={QuizScreenHeaderOptions}
      />
      <Stack.Screen
        name="Quiz1"
        component={Quiz1}
        options={QuizScreenHeaderOptions}
      />
      <Stack.Screen
        name="Quiz2"
        component={Quiz2}
        options={QuizScreenHeaderOptions}
      />
      <Stack.Screen
        name="Quiz3"
        component={Quiz3}
        options={QuizScreenHeaderOptions}
      />
      <Stack.Screen
        name="Quiz4"
        component={Quiz4}
        options={QuizScreenHeaderOptions}
      />
    </Stack.Navigator>
  );
};

export default React.memo(NewActionStackNavigator);
