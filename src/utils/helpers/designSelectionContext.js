import React, { useMemo, useReducer } from 'react';

const DesignSelectionContext = React.createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  switch (type) {
    case 'REMOVE_ITEM': {
      const { item: { id: itemId } = {} } = action;
      const { userDesignSelections } = prevState;
      const filteredItems = userDesignSelections.filter((item) => item.id === itemId);
      const currentQuantity = filteredItems[0]?.quantity;
      if (currentQuantity && currentQuantity > 1) {
        return {
          ...prevState,
          userDesignSelections: prevState.userDesignSelections.map((item) => {
            if (item.id === itemId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return { ...item };
          }),
        };
      }
      let index;
      for (let i = 0; i < prevState.userDesignSelections.length; i++) {
        if (prevState.userDesignSelections[i].id === itemId) {
          index = i;
        }
      }
      console.log('removing at ----', index);

      return {
        ...prevState,
        userDesignSelections: [
          ...prevState.userDesignSelections.slice(0, index),
          ...prevState.userDesignSelections.slice(index + 1),
        ],
      };
    }
    case 'ADD_ITEM': {
      const { item: { id: itemId, defaultQuantity } = {} } = action;
      const { userDesignSelections } = prevState;
      const filteredItems = userDesignSelections.filter((item) => item.id === itemId);

      if (!filteredItems.length) {
        const selectionItem = { id: itemId, quantity: defaultQuantity };
        console.log('prev state is', prevState.userDesignSelections);
        return {
          ...prevState,
          userDesignSelections: [...prevState.userDesignSelections, selectionItem],
        };
      }

      return {
        ...prevState,
        userDesignSelections: prevState.userDesignSelections.map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return { ...item };
        }),
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
      userDesignSelections: state.userDesignSelections,
    }),
    [state.userDesignSelections]
  );
  return {
    designSelectionsContext,
  };
};

export { DesignSelectionContext, useDesignSelectionContext };
