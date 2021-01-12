import {Block, Button, Text} from '@components/index';
import React from 'react';

const Collection = ({navigation}) => {
  return (
    <Block center middle>
      <Text body center mb2>
        This is the Collection screen
      </Text>
      <Button size="sm" onPress={() => navigation.navigate('Home')}>
        <Text>Go to Home Screen</Text>
      </Button>
    </Block>
  );
};

export default Collection;
