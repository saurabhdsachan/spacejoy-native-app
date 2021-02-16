import { Block, Button, Text } from '@components/index';
import { LottieAnimations } from '@components/LottieAnimations';
import { theme } from '@constants/index';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const SuccessOverlay = ({ setRef, navigation, closeModal }) => {
  return (
    <Portal>
      <Modalize
        ref={setRef}
        panGestureEnabled={false}
        closeOnOverlayTap={false}
        modalStyle={styles.container}
        modalTopOffset={0}
      >
        <Block padding={SIZES.padding * 2} style={styles.success}>
          <Block style={{ height: 300, width: 600 }} color="white">
            <LottieAnimations name="paymentSuccess" height={600} autoPlay={true} />
          </Block>
          <Button
            color={COLORS.black}
            size="sm"
            onPress={() => {
              closeModal();
              navigation.navigate('Home');
            }}
          >
            <Text center color={COLORS.white}>
              <Icon name="ios-arrow-back" size={14} /> Go back to Browsing
            </Text>
          </Button>
        </Block>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  success: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SuccessOverlay;
