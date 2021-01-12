import {Block, Text} from '@components/index';
import {images, theme} from '@constants/index';
import {elevationShadowStyle} from '@utils/styleHelper';
import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {service1, service2, service3, poweredBy} = images;

const {COLORS, SIZES} = theme;

const NewAction = ({navigation}) => {
  return (
    <ScrollView>
      <Block padding={SIZES.padding} margin={[70, 0, 0, 0]}>
        <Text h1 mb2>
          Design
        </Text>
        <Text h1 mb4>
          My Room
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row color="white" style={styles.serviceCard}>
            <Block middle flex={1.25}>
              <Image
                source={service1}
                resizeMode="contain"
                style={{
                  height: 85,
                  width: 85,
                }}
              />
            </Block>
            <Block flex={3}>
              <Text mb1 h2 color="#FD8231">
                DIY YOUR OWN ROOM
              </Text>
              <Text small>
                Design your actual room in 3D Living Room, Entryway…
              </Text>
              <Text right mt2>
                <Icon color="#FD8231" name="arrow-forward" size={18} />
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row color="white" style={styles.serviceCard}>
            <Block middle flex={1.25}>
              <Image
                source={service2}
                resizeMode="contain"
                style={{
                  height: 85,
                  width: 85,
                }}
              />
            </Block>
            <Block flex={3}>
              <Text mb1 h2 color="#AE8000">
                PICK A ROOM & DIY
              </Text>
              <Text small>
                Choose from 1000+ layouts & start designing yourself
              </Text>
              <Text right mt2>
                <Icon color="#AE8000" name="arrow-forward" size={18} />
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <Block row color="white" style={styles.serviceCard}>
            <Block middle flex={1.25}>
              <Image
                source={service3}
                resizeMode="contain"
                style={{
                  height: 85,
                  width: 85,
                }}
              />
            </Block>
            <Block flex={3}>
              <Text mb1 h2 color="#0091FF">
                HIRE OUR DESIGNER
              </Text>
              <Text small>Online Interior Design Services By Spacejoy</Text>
              <Text right mt2>
                <Icon color="#0091FF" name="arrow-forward" size={18} />
              </Text>
            </Block>
          </Block>
        </TouchableOpacity>
        <Block center middle>
          <Image
            source={poweredBy}
            resizeMode="contain"
            style={{
              height: 80,
              marginTop: 20,
            }}
          />
        </Block>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  serviceCard: {
    ...elevationShadowStyle(1),
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
  },
});

export default NewAction;
