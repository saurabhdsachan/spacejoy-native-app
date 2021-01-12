import {theme} from '@constants/index';
import React from 'react';
import {Platform, Switch} from 'react-native';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

export default class SwitchInput extends React.PureComponent {
  render() {
    const {value, ...props} = this.props;
    let thumbColor = null;

    if (Platform.OS === 'android') {
      thumbColor = GRAY_COLOR;
      if (props.value) thumbColor = theme.COLORS.secondary;
    }

    return (
      <Switch
        thumbColor={thumbColor}
        ios_backgroundColor={GRAY_COLOR}
        trackColor={{
          // false: GRAY_COLOR,
          true: theme.COLORS.secondary,
        }}
        value={value}
        {...props}
      />
    );
  }
}
