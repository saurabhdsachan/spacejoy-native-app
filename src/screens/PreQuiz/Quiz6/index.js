import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StatusBar, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchPricingItems } from '../Quiz5/fetchers';
import PricingCard from '../Quiz5/PricingCards';
import PricingTabs from '../Quiz5/PricingTabs';
import RoomItem from './RoomItem';

const { SIZES, COLORS } = theme;

const { width } = SIZES;
const ITEM_SIZE = width * 0.8;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;

const sortByKey = (array, key) => {
  return [...array].sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const Quiz6 = () => {
  const [pricingItems, setPricingItems] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoadingStatus] = useState(false);
  const [showIndicator, setIndicatorStatus] = useState(false);
  const modalizeRef = useRef(null);
  const [pricingMap, setPricingMap] = useState({});
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isModalOpen, setModalOpen] = useState(false);
  const { userDesignSelections, removeSelection, updateSelection } = React.useContext(DesignSelectionContext);
  const sortedArray = sortByKey(userDesignSelections, 'title');
  const flatList = useRef(null);
  useEffect(() => {
    // fetch pricing items
    setLoadingStatus(true);
    fetchPricingItems()
      .then((data) => {
        const priceMap = {};
        const dataToRender = data.map((price, index) => {
          priceMap[price.slug] = price.salePrice.value;
          if (index === 0) {
            return { ...price, active: true, ref: React.createRef() };
          }
          return { ...price, active: false, ref: React.createRef() };
        });
        setPricingMap(priceMap);
        setPricingItems(dataToRender);
        setLoadingStatus(false);
        // setCurrentActive(1);
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
  }, [currentActive]);

  useEffect(() => {
    if (Object.keys(pricingMap).length) {
      let sumTotalAmount = 0;
      userDesignSelections.forEach((item) => {
        sumTotalAmount += pricingMap[item.selectedPackage || item.defaultSelection || 0];
      });
      setTotalAmount(sumTotalAmount);
    }
  }, [pricingMap, userDesignSelections]);

  const onOpen = () => {
    modalizeRef.current?.open();
    setModalOpen(true);
    setIndicatorStatus(true);
  };
  const scrollXInterpolation = isModalOpen ? { scrollX } : { scrollX: null };
  return (
    <Block style={styles.container} color="white">
      {loading && (
        <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
          <ActivityIndicator size="small" />
        </Block>
      )}
      <Block flex={false} color="white" padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
        <StatusBar barStyle="dark-content" />
        <Text h2>Package</Text>
      </Block>
      <Block color="white" flex={false} middle style={{ height: 120 }} margin={[SIZES.padding, 0, 0, 0]}>
        <PricingTabs
          data={pricingItems}
          onPress={setCurrentActive}
          {...scrollXInterpolation}
          showIndicator={showIndicator}
        />
      </Block>
      {!loading && (
        <Block flex={1} color="white">
          <Block flex={false} color="white" center margin={[SIZES.padding, 0, 0, 0]}>
            <Button
              ghost
              color={COLORS.white}
              size="sm"
              onPress={() => {
                onOpen();
                setCurrentActive(0);
              }}
              style={{ width: 200 }}
            >
              <Text center>
                <Icon name="chevron-down-outline" size={14} /> Compare Packages{' '}
                <Icon name="chevron-down-outline" size={14} />
              </Text>
            </Button>
          </Block>
          <Block
            row
            padding={[0, SIZES.padding, 0, SIZES.padding]}
            style={styles.cartHeader}
            space="between"
            flex={0.5}
          >
            <Block middle>
              <Text bold>
                Room Type{' '}
                <Text light>
                  {userDesignSelections?.length > 4 ? ` ( ${userDesignSelections?.length} rooms )` : ''}
                </Text>
              </Text>
            </Block>
            <Block middle center>
              <Text bold center>
                Package
              </Text>
            </Block>
          </Block>
          <Block flex={4} color="white">
            <FlatList
              keyExtractor={(item, index) => `roomItem-${index}`}
              data={sortedArray}
              contentContainerStyle={styles.lastCard}
              renderItem={({ item, index }) => (
                <RoomItem
                  data={{ item, index }}
                  removeSelection={removeSelection}
                  updateSelection={updateSelection}
                  pricingItems={pricingItems}
                />
              )}
            />
          </Block>
          <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
            <Block middle>
              <Button color={COLORS.black}>
                <Text white center>{`Pay $${totalAmount}`}</Text>
              </Button>
            </Block>
          </LinearGradient>
        </Block>
      )}
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalTopOffset={0}
          adjustToContentHeight={true}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          withOverlay={true}
        >
          <Block padding={[0, 0, SIZES.padding * 2, 0]}>
            <Block padding={SIZES.padding}>
              <Text h2>Compare Prices</Text>
            </Block>
            <Animated.FlatList
              ref={flatList}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pricingItems}
              keyExtractor={(item) => item.id}
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                useNativeDriver: false,
              })}
              //   onMomentumScrollEnd={handleScrollEnd}
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
        </Modalize>
      </Portal>
    </Block>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartHeader: {
    borderBottomWidth: 2,
    borderBottomColor: theme.COLORS.gray2,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
  lastCard: {
    paddingBottom: 100,
  },
});
export default Quiz6;
