import { Block, Text } from '@components/index';
import { images, theme } from '@constants/index';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { service1, service2, service3, logo, chair } = images;

const { COLORS, SIZES } = theme;

const NewAction = ({ navigation }) => {
  return (
    <ScrollView alwaysBounceVertical={false} style={{ backgroundColor: COLORS.white }}>
      <Block padding={SIZES.padding} margin={[SIZES.safe, 0, 0, 0]}>
        <Image
          source={chair}
          resizeMode="cover"
          style={{
            position: 'absolute',
            right: '5%',
            height: 100,
            width: 90,
          }}
        />
        <Text h1 mb2 mt2>
          Design my room
        </Text>
        <Text small mb4>
          Design my room
        </Text>
        <Block>
          <TouchableOpacity activeOpacity={0.8}>
            <Block row color="#BEEBE9" style={styles.serviceCard}>
              <Block middle flex={1.5}>
                <Image
                  source={service1}
                  resizeMode="contain"
                  style={{
                    height: 85,
                    width: 85,
                  }}
                />
              </Block>
              <Block middle flex={3}>
                <Text mb1 h3>
                  DIY YOUR OWN ROOM
                </Text>
                <Text small>Design your actual room in 3D Living Room, Entryway…</Text>
                <Text left mt2>
                  <Icon name="arrow-forward" size={18} />
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Block color="#EBE6E4" row style={styles.serviceCard}>
              <Block middle flex={1.5}>
                <Image
                  source={service2}
                  resizeMode="contain"
                  style={{
                    height: 85,
                    width: 85,
                  }}
                />
              </Block>
              <Block middle flex={3}>
                <Text mb1 h3>
                  PICK A ROOM & DIY
                </Text>
                <Text small>Choose from 1000+ layouts & start designing yourself</Text>
                <Text left mt2>
                  <Icon name="arrow-forward" size={18} />
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('DesignService')}>
            <Block row color="#F4DADA" style={styles.serviceCard}>
              <Block middle flex={1.5}>
                <Image
                  source={service3}
                  resizeMode="contain"
                  style={{
                    height: 85,
                    width: 85,
                  }}
                />
              </Block>
              <Block middle flex={3}>
                <Text mb1 h3>
                  HIRE OUR DESIGNER
                </Text>
                <Text small>Online Interior Design Services By Spacejoy</Text>
                <Text left mt2>
                  <Icon name="arrow-forward" size={18} />
                </Text>
              </Block>
            </Block>
          </TouchableOpacity>
          <Block center middle>
            <Image
              source={logo}
              resizeMode="contain"
              style={{
                height: 25,
                width: 120,
              }}
            />
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    height: 150,
  },
});

export default NewAction;
