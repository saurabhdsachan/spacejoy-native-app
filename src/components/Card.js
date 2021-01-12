import {theme} from '@constants/index';
import {elevationShadowStyle} from '@utils/styleHelper';
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  card: {
    ...elevationShadowStyle(2),
    borderRadius: theme.SIZES.radius,
  },
});

export default class Card extends Component {
  render() {
    const {color, style, children, ...props} = this.props;
    const cardStyles = [styles.card, style];

    return (
      <TouchableOpacity
        color={color || theme.COLORS.white}
        activeOpacity={0.8}
        style={cardStyles}
        {...props}>
        {children}
      </TouchableOpacity>
    );
  }
}
