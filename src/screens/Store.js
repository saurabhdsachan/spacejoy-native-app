import { Block, Button, Text } from '@components/';
import React from 'react';
import { StatusBar } from 'react-native';

const Store = ({ navigation }) => {
  return (
    <Block center middle>
      <StatusBar barStyle="dark-content" />
      <Text body center mb2>
        This is the Store screen
      </Text>
      <Button shadow color="primary" size="sm" onPress={() => navigation.navigate('Home')}>
        <Text color="white">Go to Home Screen</Text>
      </Button>
    </Block>
  );
};

export default Store;
