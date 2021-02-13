import { Block, Button, Text } from '@components/index';
import { images, theme } from '@constants/index';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const { SIZES, COLORS } = theme;

const { living } = images;

const DesignService = ({ navigation }) => {
  return (
    <Block color={COLORS.white}>
      <ScrollView bounces={false}>
        <Block flex={false}>
          <Image
            source={living}
            resizeMode="contain"
            style={{
              height: SIZES.height * 0.3,
            }}
          />
        </Block>
        <Block flex={false} padding={SIZES.padding}>
          <Text h2>How does Spacejoy design service work?</Text>
          <Text small mt1>
            Follow the steps
          </Text>
          <Block>
            <Block row marginTop={SIZES.padding}>
              <Block flex={0.5}>
                <Block color="#BEEBE9" center middle style={styles.textCount}>
                  <Text h2 center>
                    1
                  </Text>
                </Block>
              </Block>
              <Block middle flex={2}>
                <Text h2 mb1>
                  Start a project
                </Text>
                <Text small>Pick from one of our design packages that best suites your needs</Text>
              </Block>
            </Block>

            <Block row marginTop={SIZES.padding}>
              <Block flex={0.5}>
                <Block color="#EBE6E4" center middle style={styles.textCount}>
                  <Text h2 center>
                    2
                  </Text>
                </Block>
              </Block>
              <Block middle flex={2}>
                <Text h2 mb1>
                  Share your likes / dislikes
                </Text>
                <Text small>Pick from one of our design packages that best suites your needs</Text>
              </Block>
            </Block>

            <Block row marginTop={SIZES.padding}>
              <Block flex={0.5}>
                <Block color="#F4DADA" center middle style={styles.textCount}>
                  <Text h2 center>
                    3
                  </Text>
                </Block>
              </Block>
              <Block middle flex={2}>
                <Text h2 mb1>
                  Buy all you need here
                </Text>
                <Text small>Pick from one of our design packages that best suites your needs</Text>
              </Block>
            </Block>

            <Block center margin={[SIZES.padding, 0, SIZES.padding, 0]}>
              <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Quiz1')}>
                <Text center color={COLORS.white}>
                  Let's Start <Icon name="ios-arrow-forward" size={14} />
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </ScrollView>
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
