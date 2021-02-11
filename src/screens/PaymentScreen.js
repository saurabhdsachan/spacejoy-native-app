import CardTextFieldScreen from '@components/CardTextFieldScreen';
import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import stripe from 'tipsi-stripe';

const { SIZES, COLORS } = theme;
const isProduction = false;
const stripeToken = isProduction
  ? 'pk_live_74NmugK4189bLTq0H74tvVz300grMkWE5n'
  : 'pk_test_YSErkwOc5SzDJ2TrWBuR4VWV00au48Fd7x';

stripe.setOptions({
  publishableKey: stripeToken,
});

const PaymentScreen = ({ route }) => {
  const [cardParams, setCardParams] = useState({});
  const [loading, setLoadingStatus] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log('route values are ----', route);
  }, [route]);
  const trackCardParams = (cardParams) => {
    // enable card and track card params
    setCardParams(cardParams);
  };

  const handlePayment = async () => {
    console.log('function fired ----');
    try {
      setLoadingStatus(true);
      setToken(null);
      setError(null);

      const stripeTok = await stripe.createTokenWithCard(cardParams);
      console.log('token is ----', stripeTok);
      setLoadingStatus(false);
      setToken(stripeToken);
      setError(null);
    } catch (error) {
      setError(null);
    }
  };

  const {
    params: { totalAmount },
  } = route;

  return (
    <Block color="white" padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Text h2>Payment</Text>
      <Block color="white" paddingVertical={SIZES.padding}>
        <CardTextFieldScreen onValid={trackCardParams} />
      </Block>
      <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
        <Block flex={1} middle center>
          <Button color={COLORS.black} size="sm" onPress={handlePayment}>
            <Text color="white">{`Pay $${totalAmount}`}</Text>
          </Button>
        </Block>
      </LinearGradient>
    </Block>
  );
};

const styles = StyleSheet.create({
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
});

export default PaymentScreen;
