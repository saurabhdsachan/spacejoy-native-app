import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import checkAuth from '@utils/helpers/checkAuth';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Dimensions, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fetchPricingItems } from './fetchers';
import PricingCard from './PricingCards';
import PricingTabs from './PricingTabs';

const { SIZES, COLORS } = theme;

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;

const Quiz5 = ({ navigation, route }) => {
  const [pricingItems, setPricingItems] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [loading, setLoadingStatus] = useState(false);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatList = useRef(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState('');
  const { userDesignSelections, updateSelection, saveToStorage } = React.useContext(DesignSelectionContext);

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
      .catch(() => {
        // set error
        setLoadingStatus(false);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);
  const handlePayButtonClick = () => {
    if (userDesignSelections.length === 0) {
      Alert.alert('Please select a room');
    } else {
      updateSelection(userDesignSelections[0], selectedPackage, 'quiz1');
      saveToStorage('quiz1');
      checkAuth(navigation, { totalAmount: totalAmount || 0 }, undefined, 'PaymentScreen', route.name);
    }
  };
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
    setTotalAmount(pricingItems[currentActive]?.salePrice?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActive]);
  const handleScrollEnd = (e) => {
    const currentIndex = Math.ceil(e.nativeEvent.contentOffset.x / ITEM_SIZE);
    setTotalAmount(pricingItems[currentIndex]?.salePrice?.value);
    setSelectedPackage(pricingItems[currentIndex]?.slug);
  };
  useEffect(() => {
    console.log('scrollX values', scrollX);
  }, [scrollX]);
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
          100% Happiness Guaranteed
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
          onMomentumScrollEnd={handleScrollEnd}
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
        <Block flex={1} middle center>
          <Button color={COLORS.black} size="sm" onPress={handlePayButtonClick}>
            <Text color="white">{`Pay $${totalAmount || 0}`}</Text>
          </Button>
        </Block>
      </LinearGradient>
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
