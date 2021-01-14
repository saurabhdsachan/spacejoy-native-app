import {Block, Radio} from '@components/index';
import React, {useReducer} from 'react';
import {Text} from 'react-native';

const data = [
  {
    label: 'Radio Button #1',
    size: 24,
    color: '#636c72',
    selected: true,
  },
  {
    label: 'Radio Button #2',
    color: '#0275d8',
    size: 24,
    selected: true,
  },
  {
    label: 'Radio Button #3',
    size: 24,
    color: '#5cb85c',
    selected: false,
  },
  {
    label: 'Radio Button #4',
    size: 24,
    color: '#d9534f',
    selected: false,
  },
];

function reducer(state, {payload}) {
  const tmpState = [...state];
  tmpState[payload].selected = !tmpState[payload].selected;
  return tmpState;
}

const Demo = () => {
  const [state, dispatch] = useReducer(reducer, data);

  return (
    <Block center middle>
      <Text>{JSON.stringify(state)}</Text>
      {data.map((item, index) => (
        <Radio
          key={index}
          button={item}
          onClick={() => dispatch({payload: index})}
        />
      ))}
    </Block>
  );
};

export default Demo;
