import { COLORS, MILD, SIZES } from '@constants/theme';
import React from 'react';
import Block from './Block';
import Text from './Text';

const LoginError = ({ errorText }) => {
  return (
    <Block flex={false} padding={SIZES.padding / 2} color={MILD.red}>
      <Text center body color={COLORS.red}>
        {errorText}
      </Text>
    </Block>
  );
};

export default LoginError;
