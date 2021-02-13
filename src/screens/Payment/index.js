import CardTextFieldScreen from '@components/CardTextFieldScreen';
import { Block, Button, Text } from '@components/index';
import { theme } from '@constants/index';
import { checkoutRoutes } from '@constants/routes';
import { useHeaderHeight } from '@react-navigation/stack';
import { fetcher, handle } from '@utils/apiFetcher';
import { DesignSelectionContext } from '@utils/helpers/designSelectionContext';
import sortByKey from '@utils/helpers/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import stripe from 'tipsi-stripe';
import { fetchPricingItems } from '../PreQuiz/Quiz5/fetchers';
import RoomItem from '../PreQuiz/Quiz6/RoomItem';
import CouponCard from './couponCards';

const { SIZES, COLORS } = theme;
const isProduction = false;
const stripeToken = isProduction
  ? 'pk_live_74NmugK4189bLTq0H74tvVz300grMkWE5n'
  : 'pk_test_YSErkwOc5SzDJ2TrWBuR4VWV00au48Fd7x';

stripe.setOptions({
  publishableKey: stripeToken,
});

const PaymentScreen = ({ route }) => {
  const [pricingItems, setPricingItems] = useState([]);
  const [cardParams, setCardParams] = useState({});
  const [loading, setLoadingStatus] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  // coupons logic
  const [loadingCoupons, setCouponLoadingStatus] = useState(true);
  const couponModalRef = useRef(null);
  const [couponsList, setCouponsList] = useState([]);
  const [couponFetchError, setCouponsFetchError] = useState(false);
  const [pricingMap, setPricingMap] = useState({});
  const {
    userDesignSelections,
    removeSelection,
    updateSelection,
    saveToStorage,
    savePricingData,
    pricingData,
  } = React.useContext(DesignSelectionContext);

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
  const trackCardParams = (cardParams) => {
    // enable card and track card params
    setCardParams(cardParams);
  };

  const handlePayment = async () => {
    console.log('function fired ----');
    try {
      setLoadingStatus(true);
      setToken(null);
      setError(null);

      const stripeTok = await stripe.createTokenWithCard(cardParams);
      console.log('token is ----', stripeTok);
      setLoadingStatus(false);
      setToken(stripeToken);
      setError(null);
    } catch (error) {
      setError(null);
    }
  };
  const openCouponModal = async () => {
    console.log('opening modal ---');
    couponModalRef?.current?.open();
    setCouponLoadingStatus(true);
    try {
      const [coupons, couponsError] = await handle(fetcher({ endPoint: checkoutRoutes.getCouponsApi, method: 'GET' }));
      if (coupons && !couponsError) {
        console.log(coupons);
        const { data: couponsData = [], statusCode } = coupons;
        if (statusCode <= 301) {
          console.log(couponsData);
          setCouponsList(couponsData);
        } else {
          throw new Error();
        }
      }
    } catch (e) {
      console.log('error occurred ----', e.message);
      setCouponsFetchError(true);
    } finally {
      setCouponLoadingStatus(false);
    }
  };
  const {
    params: { totalAmount },
  } = route;
  const headerHeight = useHeaderHeight();

  const sortedArray = sortByKey(userDesignSelections, 'title');
  return (
    <Block color="white" padding={[SIZES.safe + 20, SIZES.padding, 0, SIZES.padding]}>
      <StatusBar barStyle="dark-content" />
      <Block flex={false} style={[styles.pageHeader, { top: headerHeight - 40 }]}>
        <Text h2> Secure Checkout</Text>
        <Text> Powered by Stripe </Text>
      </Block>
      <Block flex={false}>
        <Button ghost center style={{ borderRadius: SIZES.radius / 4 }} onPress={openCouponModal}>
          <Text center transform="capitalize">
            Apply Coupon
          </Text>
        </Button>
      </Block>
      <Block flex={5} color="white">
        <Block row padding={SIZES.padding} style={styles.cartHeader} space="between" flex={0.5}>
          <Block middle>
            <Text bold>
              Room Type{' '}
              <Text light>{userDesignSelections?.length > 4 ? ` ( ${userDesignSelections?.length} rooms )` : ''}</Text>
            </Text>
          </Block>
          <Block middle center>
            <Text bold align="right">
              Package
            </Text>
          </Block>
        </Block>
        <FlatList
          keyExtractor={(item, index) => `roomItem-${index}`}
          data={sortedArray}
          contentContainerStyle={styles.lastCard}
          renderItem={({ item, index }) => (
            <RoomItem
              data={{ item, index }}
              removeSelection={false}
              updateSelection={() => {}}
              pricingItems={pricingItems}
              updateStorage={() => {}}
              isEditable={false}
            />
          )}
        />
      </Block>
      <Block row flex={1} color="white" padding={[0, SIZES.padding]}>
        <Block row>
          <Text bold>Estimated Price</Text>
        </Block>
        <Block>
          <Text style={{ textAlign: 'right' }}>$ {totalAmount}</Text>
        </Block>
      </Block>
      <Block flex={2} color="white" paddingVertical={SIZES.padding}>
        <CardTextFieldScreen onValid={trackCardParams} />
      </Block>
      <LinearGradient colors={[COLORS.transparent, COLORS.white]} style={styles.bottomButtons}>
        <Block flex={1} middle center>
          <Button color={COLORS.black} size="sm" onPress={handlePayment}>
            <Text color="white">{`Pay $${totalAmount}`}</Text>
          </Button>
        </Block>
      </LinearGradient>
      <Portal>
        <Modalize ref={couponModalRef} modalTopOffset={200}>
          {loading && (
            <Block center middle color={COLORS.semiTransparent} style={{ ...StyleSheet.absoluteFill, zIndex: 1 }}>
              <ActivityIndicator size="small" />
            </Block>
          )}
          <Block padding={SIZES.padding}>
            <Block>
              <Text h2>Apply Coupon</Text>
            </Block>
            <Block style={{ marginTop: SIZES.padding / 2 }}>
              <TextInput
                keyboardType="email-address"
                placeholderTextColor={COLORS.gray}
                style={styles.textInput}
                placeholder="Apply Coupons"
              />
              <Button color="black" style={styles.applyBtn}>
                <Text color="white">APPLY</Text>
              </Button>
            </Block>

            <ScrollView>
              {couponsList.map((item) => {
                return <CouponCard title={item.title} code={item.code} description={item.description} />;
              })}
            </ScrollView>
          </Block>
        </Modalize>
      </Portal>
    </Block>
  );
};

const styles = StyleSheet.create({
  applyBtn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 1,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    padding: SIZES.padding,
  },
  textInput: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.padding / 1.25,
    borderRadius: SIZES.radius / 6,
    marginBottom: SIZES.padding / 2,
  },
  pageHeader: {
    position: 'absolute',
    left: 65,
  },
  cartHeader: {
    borderBottomWidth: 2,
    borderBottomColor: theme.COLORS.gray2,
  },
});

export default PaymentScreen;
