import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaymentCardTextField } from 'tipsi-stripe';

export default class CardTextFieldScreen extends PureComponent {
  static title = 'Card Text Field';

  state = {
    valid: false,
    params: {
      number: '',
      expMonth: 0,
      expYear: 0,
      cvc: '',
    },
  };

  handleFieldParamsChange = (valid, params) => {
    this.setState(
      {
        valid,
        params,
      },
      () => {
        if (valid) {
          const { onValid } = this.props;
          if (valid) {
            onValid(params);
          }
        }
      }
    );
  };

  render() {
    return (
      <View>
        <PaymentCardTextField
          accessible={false}
          style={styles.field}
          onParamsChange={this.handleFieldParamsChange}
          numberPlaceholder="XXXX XXXX XXXX XXXX"
          expirationPlaceholder="MM/YY"
          cvcPlaceholder="CVC"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
  spoiler: {
    width: 300,
  },
  params: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  field: {
    // width: 300,
    color: '#449aeb',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
});
