import {theme} from '@constants/index';
import React, {Component} from 'react';
import Block from './Block';
import Button from './Button';
import Text from './Text';

export class HeaderRight extends Component {
  render() {
    const {navigation, onPress} = this.props;
    return (
      <Block row start padding={[0, theme.SIZES.base]}>
        <Button onPress={onPress}>
          <Text style={{color: '#fff'}}>Light Screen</Text>
        </Button>
      </Block>
    );
  }
}

export default HeaderRight;
