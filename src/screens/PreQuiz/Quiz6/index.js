import { Block, Button, Text } from '@components/index';
import { LottieAnimations } from '@components/LottieAnimations';
import { theme } from '@constants/index';
import checkAuth from '@utils/helpers/checkAuth';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import sortByKey from '@utils/helpers/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, StatusBar, StyleSheet } from 'react-native';
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

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;
const Quiz6 = ({ navigation, route }) => {
  const [pricingItems, setPricingItems] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoadingStatus] = useState(false);
  const modalizeRef = useRef(null);
  const [pricingMap, setPricingMap] = useState({});
  const scrollX = new Animated.Value(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    userDesignSelections,
    removeSelection,
    updateSelection,
    saveToStorage,
    savePricingData,
    pricingData,
  } = React.useContext(DesignSelectionContext);
  const sortedArray = sortByKey(userDesignSelections, 'title');
  const j = 0;
  const flatList = useRef(null);
  useEffect(() => {
    const priceMap = {};
    // fetch pricing items
    setLoadingStatus(true);
    if (pricingData.length === 0) {
      fetchPricingItems()
        .then((data) => {
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
    } else {
      const dataToRender = pricingData.map((price, index) => {
        priceMap[price.slug] = price.salePrice.value;
        if (index === 0) {
          return { ...price, active: true, ref: React.createRef() };
        }
        return { ...price, active: false, ref: React.createRef() };
      });
      setPricingMap(priceMap);
      setPricingItems(dataToRender);
    }
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
  };

  const cleanUpAfterModalClose = () => {
    setModalOpen(false);
  };
  const resetScrollPosition = () => {};
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
      <Block color="white" flex={false} middle style={{ height: 113 }} margin={[SIZES.padding, 0, 0, 0]}>
        <PricingTabs data={pricingItems} onPress={setCurrentActive} {...scrollXInterpolation} showIndicator={false} />
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
          {userDesignSelections.length > 0 ? (
            <>
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
                      // updateStorage={saveToStorage}
                    />
                  )}
                />
              </Block>
              <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
                <Block flex={1} middle center>
                  <Button
                    color={COLORS.black}
                    size="sm"
                    onPress={() => {
                      checkAuth(navigation, { totalAmount }, undefined, 'PaymentScreen', route.name);
                    }}
                  >
                    <Text color="white">{`Pay $${totalAmount}`}</Text>
                  </Button>
                </Block>
              </LinearGradient>
            </>
          ) : (
            <Block middle style={styles.emptyScreen} center>
              <LottieAnimations name="empty" height={150} width={150} autoPlay={true} />
              <Text middle center mt2 mb4 color={COLORS.gray}>
                You have not selected any packages yet.{'\n'}
                Please select a package
              </Text>
              <Button
                color={COLORS.black}
                size="sm"
                onPress={() => {
                  navigation.navigate('Quiz1');
                }}
              >
                <Text color="white">Select a package</Text>
              </Button>
            </Block>
          )}
        </Block>
      )}
      <Portal>
        <Modalize
          ref={modalizeRef}
          modalTopOffset={0}
          adjustToContentHeight={true}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
          withOverlay={true}
          onClosed={cleanUpAfterModalClose}
          onOpened={resetScrollPosition}
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
  emptyScreen: {
    height: 300,
    paddingVertical: SIZES.padding,
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
