import { COLORS, SIZES } from '@constants/index';
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { PaymentCardTextField } from 'tipsi-stripe';

export default class CardTextFieldScreen extends PureComponent {
  static title = 'Card Text Field';

  handleFieldParamsChange = (valid, params) => {
    this.setState({}, () => {
      if (valid) {
        const { onValid } = this.props;
        if (valid) onValid(params);
      }
    });
  };

  render() {
    return (
      <PaymentCardTextField
        accessible={false}
        style={styles.field}
        onParamsChange={this.handleFieldParamsChange}
        numberPlaceholder="XXXX XXXX XXXX XXXX"
        expirationPlaceholder="MM/YY"
        cvcPlaceholder="CVC"
      />
    );
  }
}

const styles = StyleSheet.create({
  field: {
    color: COLORS.black,
    borderColor: COLORS.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: SIZES.radius / 4,
    overflow: 'hidden',
    fontSize: SIZES.body,
  },
});
