import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import PricingTabs from './PricingTabs';
import PricingCard from './PricingCards';
import { fetchPricingItems } from './fetchers';

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
      <Block flex={2} color="white" row center middle>
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
          //   onMomentumScrollEnd={handleScrollEnd}
          snapToInterval={ITEM_SIZE - SPACER_ITEM_WIDTH}
          renderItem={({ item }) => {
            return <PricingCard slug={item.slug} data={item} cardWidth={ITEM_SIZE} />;
          }}
        />
      </Block>
      <Block flex={2}>
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
    </Block>
  );
};
export default Quiz5;

const styles = StyleSheet.create({
  radioCard: {
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: (SIZES.padding * 2) / 3,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    // marginHorizontal: SPACING,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
  priceTab: {
    height: 50,
    width: 150,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'blue',
  },
  swipeCard: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    marginBottom: SIZES.padding,
    // marginHorizontal: SPACING,
  },
  tabBodyText: {
    lineHeight: 16,
  },
  lastChild: {
    borderBottomWidth: 0,
    marginBottom: 80,
  },
  firstChild: {
    marginTop: SIZES.padding,
  },
  borderTransparent: {
    borderColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
