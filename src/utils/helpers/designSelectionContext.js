import React, { useEffect, useMemo, useReducer } from 'react';

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
      const { id } = item;
      let index;

      for (let i = 0; i < prevState.userDesignSelections.length; i++) {
        if (prevState.userDesignSelections[i].id === id) {
          index = i;
          break;
        }
      }

      console.log('index is ---', index);

      if (typeof index !== 'undefined') {
        console.log('in here');
        return {
          ...prevState,
          userDesignSelections: [
            ...prevState.userDesignSelections.slice(0, index),
            ...prevState.userDesignSelections.slice(index + 1),
          ],
        };
      }
      return {
        ...prevState,
      };
    }
    case 'ADD_ITEM': {
      console.log('fired add');
      const { item } = action;
      const { defaultQuantity } = item;
      const { userDesignSelections } = prevState;

      const newCartItem = { ...item, selectionItemId: userDesignSelections.length + defaultQuantity };

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
