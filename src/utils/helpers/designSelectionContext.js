import sortByKey from '@utils/helpers/helpers';
import React, { useMemo, useReducer } from 'react';

const DesignSelectionContext = React.createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  switch (type) {
    case 'UPDATE_ITEM': {
      const { item, value } = action;
      const { selectionItemId } = item;
      const newArray = [...prevState.userDesignSelections].map((selItem) => {
        if (selItem.selectionItemId === selectionItemId) {
          return { ...selItem, selectedPackage: value };
        } else {
          return { ...selItem };
        }
      });
      return {
        ...prevState,
        userDesignSelections: [...newArray],
      };
    }
    case 'REMOVE_ITEM': {
      const { item } = action;
      const { id, selectionItemId = '' } = item;
      let index;
      const keyToSearch = selectionItemId ? 'selectionItemId' : 'id';
      const indexToSearch = selectionItemId || id;

      for (let i = 0; i < prevState.userDesignSelections.length; i++) {
        if (prevState.userDesignSelections[i][keyToSearch] === indexToSearch) {
          index = i;
          break;
        }
      }

      const updatedArray = [
        ...prevState.userDesignSelections.slice(0, index),
        ...prevState.userDesignSelections.slice(index + 1),
      ];

      let j = 0;
      const sortedArray = [...sortByKey(updatedArray, 'title')];
      const newArray = sortedArray.map((obj, i) => {
        j += 1;
        const str = `${obj.title.split(' -')[0]} - ${j}`;
        if (obj?.id !== sortedArray[i + 1]?.id) {
          j = 0;
        }
        return { ...obj, title: str };
      });

      if (typeof index !== 'undefined') {
        return {
          ...prevState,
          userDesignSelections: newArray,
        };
      }
      return {
        ...prevState,
      };
    }
    case 'ADD_ITEM': {
      const { item } = action;
      const { defaultQuantity, id } = item;
      const { userDesignSelections } = prevState;
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
        userDesignSelections: [...userDesignSelections, { ...newCartItem }],
      };
    }
    default: {
      return { ...prevState };
    }
  }
};

const initialState = {
  userDesignSelections: [],
};

const useDesignSelectionContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const designSelectionsContext = useMemo(
    () => ({
      addSelection: (item) => {
        dispatch({ type: 'ADD_ITEM', item });
      },
      removeSelection: (item) => {
        dispatch({ type: 'REMOVE_ITEM', item });
      },
      updateSelection: (item, value) => {
        dispatch({ type: 'UPDATE_ITEM', value, item });
      },
      userDesignSelections: state.userDesignSelections,
    }),
    [state.userDesignSelections]
  );
  return {
    designSelectionsContext,
  };
};

export { DesignSelectionContext, useDesignSelectionContext };
