import {Block, Button, Text} from '@components/index';
import {theme} from '@constants/index';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const DesignService = ({navigation}) => {
  return (
    <Block color={COLORS.white}>
      <Block color={COLORS.white} center>
        <Image
          source={{
            uri:
              'https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,c_scale,q_100,w_900/v1570442615/web/2000_clxfbs.png',
          }}
          resizeMode="contain"
          style={{
            height: 350,
            width: '85%',
          }}
        />
      </Block>
      <Block flex={2} padding={SIZES.padding}>
        <Text h2 mt2>
          How does Spacejoy design service work?
        </Text>
        <Text small mt2>
          Follow the steps
        </Text>

        <Block margin={[SIZES.padding, 0, 0, 0]}>
          <Block row margin={[SIZES.padding, 0, SIZES.padding, 0]}>
            <Block flex={0.5}>
              <Block color="#BEEBE9" center middle style={styles.textCount}>
                <Text h2 center>
                  1
                </Text>
              </Block>
            </Block>
            <Block middle flex={2}>
              <Text h2 mb2>
                Start a project
              </Text>
              <Text small>
                Pick from one of our design packages that best suites your needs
              </Text>
            </Block>
          </Block>

          <Block row margin={[SIZES.padding, 0, SIZES.padding, 0]}>
            <Block flex={0.5}>
              <Block color="#EBE6E4" center middle style={styles.textCount}>
                <Text h2 center>
                  2
                </Text>
              </Block>
            </Block>
            <Block middle flex={2}>
              <Text h2 mb2>
                Share your likes / dislikes
              </Text>
              <Text small>
                Pick from one of our design packages that best suites your needs
              </Text>
            </Block>
          </Block>

          <Block row margin={[SIZES.padding, 0, SIZES.padding, 0]}>
            <Block flex={0.5}>
              <Block color="#F4DADA" center middle style={styles.textCount}>
                <Text h2 center>
                  3
                </Text>
              </Block>
            </Block>
            <Block middle flex={2}>
              <Text h2 mb2>
                Buy all you need here
              </Text>
              <Text small>
                Pick from one of our design packages that best suites your needs
              </Text>
            </Block>
          </Block>

          <Block center margin={[SIZES.padding, 0, SIZES.padding, 0]}>
            <Button
              color={COLORS.black}
              size="sm"
              onPress={() => navigation.navigate('Quiz1')}>
              <Text center color={COLORS.white}>
                Let's Start <Icon name="ios-arrow-forward" size={14} />
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default DesignService;

const styles = StyleSheet.create({
  textCount: {
    marginRight: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  textContainer: {},
});
