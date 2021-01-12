import {SIZES, theme} from '@constants/index';
import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import Block from './Block';

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
  },
});
export class HeaderLeft extends Component {
  render() {
    return (
      <Block row start padding={[0, theme.SIZES.base]}>
        <Image
          height={SIZES.header}
          source={require('../assets/images/onboarding-1.png')}
          style={styles.logo}
        />
      </Block>
    );
  }
}

export default HeaderLeft;
