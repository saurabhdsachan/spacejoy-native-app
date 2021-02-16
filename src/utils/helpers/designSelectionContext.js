import AsyncStorage from '@react-native-async-storage/async-storage';
// import sortByKey from '@utils/helpers/helpers';
import React, { useEffect, useMemo, useReducer } from 'react';

const DesignSelectionContext = React.createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  switch (type) {
    case 'SAVE_DATA_TO_APP': {
      const { data } = action;
      const obj = {};
      Object.keys(data).forEach((item) => {
        obj[item] = data[item];
      });
      return {
        ...prevState,
        ...obj,
      };
    }
    case 'UPDATE_ITEM': {
      const { item, value, quizTitle } = action;
      const { selectionItemId } = item;
      const newArray = [...prevState[quizTitle].userDesignSelections].map((selItem) => {
        if (selItem.selectionItemId === selectionItemId) {
          return { ...selItem, selectedPackage: value };
        } else {
          return { ...selItem };
        }
      });
      return {
        ...prevState,
        [quizTitle]: {
          ...prevState[quizTitle],
          userDesignSelections: [...newArray],
        },
      };
    }
    case 'REMOVE_ITEM': {
      const { item, quizTitle } = action;
      const { id, selectionItemId = '' } = item;
      let index;
      const keyToSearch = selectionItemId ? 'selectionItemId' : 'id';
      const indexToSearch = selectionItemId || id;

      for (let i = 0; i < prevState[quizTitle].userDesignSelections.length; i++) {
        if (prevState[quizTitle].userDesignSelections[i][keyToSearch] === indexToSearch) {
          index = i;
          break;
        }
      }

      const updatedArray = [
        ...prevState[quizTitle].userDesignSelections.slice(0, index),
        ...prevState[quizTitle].userDesignSelections.slice(index + 1),
      ];

      // let j = 0;
      // const sortedArray = [...sortByKey(updatedArray, 'title')];
      // const newArray = sortedArray.map((obj, i) => {
      //   j += 1;
      //   const str = `${obj.title.split(' -')[0]} - ${j}`;
      //   if (obj?.id !== sortedArray[i + 1]?.id) {
      //     j = 0;
      //   }
      //   return { ...obj, title: str };
      // });

      if (typeof index !== 'undefined') {
        return {
          ...prevState,
          [quizTitle]: {
            ...prevState[quizTitle],
            userDesignSelections: updatedArray,
          },
        };
      }
      return {
        ...prevState,
      };
    }
    case 'ADD_ITEM': {
      const { item, quizTitle } = action;
      const { defaultQuantity, id } = item;
      const { userDesignSelections } = prevState[quizTitle];
      // check if item exists with same id
      const countOfSimilarItems = userDesignSelections.filter((selItem) => selItem.id === id).length;
      const titleSuffix = `- ${countOfSimilarItems + 1}`;
      const newCartItem = {
        ...item,
        title: `${item.title} ${titleSuffix}`,
        selectionItemId: userDesignSelections.length + defaultQuantity,
      };

      return {
        ...prevState,
        [quizTitle]: {
          ...prevState[quizTitle],
          userDesignSelections: [...userDesignSelections, { ...newCartItem }],
        },
      };
    }
    case 'SAVE_USER_ANSWER': {
      const { quizTitle, value } = action;
      console.log(quizTitle, value);
      return {
        ...prevState,
        [quizTitle]: value,
      };
    }
    case 'SAVE_PRICING_DATA': {
      const { pricingData } = action;
      return {
        ...prevState,
        pricingData,
      };
    }
    case 'CLEAR_ALL': {
      return {
        ...initialState,
      };
    }
    default: {
      return { ...prevState };
    }
  }
};

const initialState = {
  quiz1: {
    userDesignSelections: [],
  },
  quiz2: '',
  quiz3: '',
  quiz4: '',
  pricingData: [],
};

const useDesignSelectionContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const hydrateLocalState = async () => {
      let userQuizData;
      try {
        const quizData = await AsyncStorage.getItem('userQuizResponse');
        if (quizData) {
          userQuizData = JSON.parse(quizData);
        } else {
          userQuizData = {};
        }
      } catch (e) {
        // console.log('error message -------', e.message);
        await AsyncStorage.removeItem('userQuizResponse');
        userQuizData = {};
      } finally {
        dispatch({ type: 'SAVE_DATA_TO_APP', data: userQuizData });
      }
    };

    hydrateLocalState();
  }, []);
  const designSelectionsContext = useMemo(
    () => ({
      addSelection: (item, quizTitle) => {
        dispatch({ type: 'ADD_ITEM', item, quizTitle });
      },
      removeSelection: (item, quizTitle) => {
        dispatch({ type: 'REMOVE_ITEM', item, quizTitle });
      },
      updateSelection: (item, value, quizTitle) => {
        dispatch({ type: 'UPDATE_ITEM', value, item, quizTitle });
      },
      userDesignSelections: state.quiz1.userDesignSelections,
      userAnswers: { quiz2: state.quiz2, quiz3: state.quiz3, quiz4: state.quiz4 },
      pricingData: state.pricingData,
      saveUserAnswer: (quizTitle, value) => {
        dispatch({ type: 'SAVE_USER_ANSWER', value, quizTitle });
      },
      savePricingData: (pricingData) => {
        dispatch({ type: 'SAVE_PRICING_DATA', pricingData });
      },
      clearStorageData: async () => {
        try {
          await AsyncStorage.setItem('userQuizResponse', JSON.stringify(initialState));
        } catch (e) {
          console.log('Error in clearing storage', e.message);
        }
      },
      clearContextData: () => {
        dispatch({ type: 'CLEAR_ALL' });
      },
      saveToStorage: async (quizTitle) => {
        // save to async storage
        try {
          const userQuizResponse = await AsyncStorage.getItem('userQuizResponse');
          if (!userQuizResponse) {
            await AsyncStorage.setItem('userQuizResponse', JSON.stringify({}));
          }
          const currentStateDataForStep = state[quizTitle];
          const data = await AsyncStorage.getItem('userQuizResponse');
          const currentData = JSON.parse(data);
          currentData[quizTitle] = currentStateDataForStep;
          await AsyncStorage.setItem('userQuizResponse', JSON.stringify(currentData));
        } catch {
          console.log('Error occurred in saving data');
        }
      },
    }),
    [state]
  );
  return {
    designSelectionsContext,
  };
};

export { DesignSelectionContext, useDesignSelectionContext };
