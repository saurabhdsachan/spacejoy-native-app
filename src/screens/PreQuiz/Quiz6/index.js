/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, Animated, Dimensions, View } from 'react-native';
import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import Icon from 'react-native-vector-icons/Ionicons';
import { Modalize } from 'react-native-modalize';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchPricingItems } from '../Quiz5/fetchers';
import PricingTabs from '../Quiz5/PricingTabs';
import PricingCard from '../Quiz5/PricingCards';
import Dropdown from './Dropdown';

const { SIZES, COLORS } = theme;

const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACING = SIZES.base * 2;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;

const sortByKey = (array, key) => {
  return [...array].sort((a, b) => {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const Quiz6 = () => {
  const [pricingItems, setPricingitems] = useState([]);
  const [currentActive, setCurrentActive] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoadingStatus] = useState(false);
  const modalizeRef = useRef(null);
  const [pricingMap, setPricingMap] = useState({});
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [isModalOpen, setModalOpen] = useState(false);
  const { userDesignSelections, removeSelection, updateSelection } = React.useContext(DesignSelectionContext);
  const sortedArray = sortByKey(userDesignSelections, 'title');
  let j = 0;
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
        setPricingitems(dataToRender);
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
          offset: currentActive * ITEM_SIZE - SPACER_ITEM_WIDTH
        });
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const onClose = () => {
    modalizeRef.current?.close();
    setModalOpen(false);
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
      <Block color="white" flex={false} middle style={{ height: 113 }} margin={[SIZES.padding, 0, 0, 0]}>
        <PricingTabs data={pricingItems} onPress={setCurrentActive} {...scrollXInterpolation} />
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
              style={{ width: 180 }}
            >
              <Text center>
                <Icon name="chevron-down-outline" size={14} /> Compare Prices{' '}
                <Icon name="chevron-down-outline" size={14} />
              </Text>
            </Button>
          </Block>
          <Block row>
            <Block padding={[0, SIZES.padding, SIZES.padding, SIZES.padding]}>
              <Block row style={styles.cartHeader}>
                <Block middle flex={5}>
                  <Text bold>Room Type</Text>
                </Block>
                <Block middle center flex={4}>
                  <Text bold center>
                    Package
                  </Text>
                </Block>
                <Block flex={1} />
              </Block>
            </Block>
          </Block>
          <Block flex={4} color="white" padding={[0, SIZES.padding]}>
            <ScrollView>
              {sortedArray.map((item, index) => {
                const { title } = item;
                let titleForView;
                if (sortedArray[index].title === sortedArray[index + 1]?.title) {
                  titleForView = j === 0 ? `${title}` : `${title} - ${j}`;
                  j++;
                } else {
                  titleForView = j === 0 ? `${title}` : `${title} - ${j}`;
                  j = 0;
                }
                return (
                  <Block middle key={item.selectionItemId} style={styles.radioCard} row spaceBetween>
                    <Block flex={5} middle>
                      <Text>{titleForView}</Text>
                    </Block>

                    <Block flex={4}>
                      <Dropdown
                        data={pricingItems}
                        onChange={(value) => updateSelection(item, value)}
                        value={item?.selectedPackage || item?.defaultSelection}
                      />
                    </Block>
                    <Block flex={1} style={{ alignItems: 'flex-end' }}>
                      <Button raw onPress={() => removeSelection(item)}>
                        <Icon name="ios-close-circle-outline" size={14} />
                      </Button>
                    </Block>
                  </Block>
                );
              })}
            </ScrollView>
          </Block>
          <Block flex={1} middle center>
            <Button color={COLORS.black} size="sm">
              <Text color="white">{`Pay $${totalAmount}`}</Text>
            </Button>
          </Block>
        </Block>
      )}

      <Modalize
        ref={modalizeRef}
        modalTopOffset={0}
        adjustToContentHeight={true}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        withOverlay={true}
      >
        <Block>
          <Block color="white" middle>
            <Button onPress={onClose}>
              <Icon name="close-outline" size={SIZES.base * 3} style={{ marginLeft: 'auto' }} />
            </Button>
          </Block>
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
      </Modalize>
    </Block>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  radioCard: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.gray2,
    paddingVertical: SIZES.padding,
    overflow: 'hidden'
  },
  cartHeader: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray2,
  },
});
export default Quiz6;
