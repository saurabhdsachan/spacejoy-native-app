import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchPricingItems } from './fetchers';
import PricingCard from './PricingCards';
import PricingTabs from './PricingTabs';

const { SIZES, COLORS } = theme;

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACING = SIZES.base * 2;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;

const Quiz5 = ({ navigation }) => {
  const [pricingItems, setPricingItems] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [loading, setLoadingStatus] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatList = useRef(null);

  useEffect(() => {
    // fetch pricing items
    setLoadingStatus(true);
    fetchPricingItems()
      .then((data) => {
        const dataToRender = data.map((price, index) => {
          if (index === 0) {
            return { ...price, active: true, ref: React.createRef() };
          }
          return { ...price, active: false, ref: React.createRef() };
        });
        setPricingItems(dataToRender);
        setLoadingStatus(false);
        setCurrentActive(1);
      })
      .catch((e) => {
        // set error
        setLoadingStatus(false);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  useEffect(() => {
    console.log('in use effect');
    if (flatList && flatList.current) {
      setTimeout(() => {
        flatList.current.scrollToOffset({
          animated: true,
          offset: currentActive * ITEM_SIZE - SPACER_ITEM_WIDTH,
        });
      }, 0);
    }
    const data = pricingItems.map((item, index) => {
      if (currentActive === index) {
        return { ...item, active: true };
      }
      return { ...item, active: false };
    });
    setPricingItems(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActive]);

  return (
    <Block style={styles.container}>
      {loading && (
        <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
          <ActivityIndicator size="small" />
        </Block>
      )}
      <Block flex={false} color="white" padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
        <StatusBar barStyle="dark-content" />
        <Text h2>Select Package</Text>
        <Text small light>
          Select Package
        </Text>
      </Block>
      <Block flex={1.75} color="white" row center middle>
        <PricingTabs data={pricingItems} onPress={setCurrentActive} scrollX={scrollX} />
      </Block>
      <Block flex={6} color="white">
        <Animated.FlatList
          ref={flatList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={pricingItems}
          keyExtractor={(item) => item.id}
          decelerationRate={0}
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
          snapToInterval={ITEM_SIZE - SPACER_ITEM_WIDTH}
          renderItem={({ item, index }) => {
            return (
              <PricingCard
                slug={item.slug}
                data={item}
                cardWidth={ITEM_SIZE}
                firstCard={index === 0}
                lastCard={index === pricingItems?.length - 1}
              />
            );
          }}
        />
      </Block>
      <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
        <Block center row space="between">
          <Button ghost color={COLORS.white} size="sm" onPress={() => navigation.goBack()}>
            <Text center>
              <Icon name="ios-arrow-back" size={14} /> Prev
            </Text>
          </Button>
          <Button color={COLORS.black} size="sm" onPress={() => navigation.navigate('Quiz5')}>
            <Text center color={COLORS.white}>
              Next <Icon name="ios-arrow-forward" size={14} />
            </Text>
          </Button>
        </Block>
      </LinearGradient>
    </Block>
  );
};
export default Quiz5;

const styles = StyleSheet.create({
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
});
