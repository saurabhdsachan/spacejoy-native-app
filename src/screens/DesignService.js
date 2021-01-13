import {Block, Button, Text} from '@components/index';
import {theme} from '@constants/index';
import React from 'react';

const {SIZES, COLORS} = theme;

const DesignService = ({navigation}) => {
  return (
    <Block middle center color={COLORS.gray}>
      <Text h2 center mt2>
        Design Service
      </Text>

      <Button color={COLORS.black} onPress={() => navigation.navigate('Home')}>
        <Text color={COLORS.white}>Back</Text>
      </Button>
    </Block>
  );
};

export default DesignService;
