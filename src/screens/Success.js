import { Block, Button, Text } from '@components/index';
import { LottieAnimations } from '@components/LottieAnimations';
import { COLORS } from '@constants/';
import React from 'react';
import { StyleSheet } from 'react-native';

const SuccessScreen = ({ navigation }) => {
  const handleRedirect = () => {
    navigation.navigate('Home', { screen: 'Home' });
  };
  return (
    <Block style={styles.container} middle center color={COLORS.white}>
      <LottieAnimations name="paymentSuccess" height={150} width={150} />
      <Text center h2 mb3>
        Payment Successful!
      </Text>
      <Button color="black" md onPress={handleRedirect}>
        <Text color="white">Browse More</Text>
      </Button>
    </Block>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SuccessScreen;
