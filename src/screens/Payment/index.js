import CardTextFieldScreen from '@components/CardTextFieldScreen';
import { Block, Button, Text } from '@components/index';
import LoginError from '@components/LoginError';
import { LottieAnimations } from '@components/LottieAnimations';
import { theme } from '@constants/index';
import { checkoutRoutes } from '@constants/routes';
import { fetcher, handle } from '@utils/apiFetcher';
import sortByKey from '@utils/helpers/helpers';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StatusBar, StyleSheet, TextInput } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
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

const makePayment = async (token) => {
  try {
    const payload = {
      packageName: 'bliss',
      projectId: '',
      token,
    };
    const [paymentRes, paymentErr] = await handle(
      fetcher({ endPoint: checkoutRoutes.paymentRoute, body: { data: payload }, method: 'POST' })
    );
    if (paymentRes && !paymentErr) {
      const { statusCode, data } = paymentRes;
      console.log(data);
      if (statusCode <= 301) {
        return data;
      } else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch {
    throw new Error();
  }
};

const PaymentScreen = ({ route, navigation }) => {
  const [pricingItems, setPricingItems] = useState([]);
  const [cardParams, setCardParams] = useState({});
  const [loading, setLoadingStatus] = useState(false);
  const [token, setToken] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  // coupons logic
  const [loadingCoupons, setCouponLoadingStatus] = useState(true);
  const [couponsList, setCouponsList] = useState([]);
  const [couponFetchError, setCouponsFetchError] = useState(false);
  const [pricingMap, setPricingMap] = useState({});
  const [currentCouponCode, setCurrentCouponCode] = useState('');
  const pricingData = [];
  const userDesignSelections = [
    {
      title: 'Home Office - 1',
      blockColor: '#D9DCF7',
      radioColor: '#7786B0',
      selected: false,
      id: 4,
      slug: 'homeOffice',
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 5,
      selectedPackage: 'bliss',
    },
    {
      title: 'Kid`s Room - 1',
      blockColor: '#EBE6E4',
      radioColor: '#D9A7A6',
      selected: false,
      id: 5,
      slug: 'kidsRoom',
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 6,
      selectedPackage: 'bliss',
    },
    {
      title: 'Living Room - 1',
      blockColor: '#DEE6E1',
      radioColor: '#8DC395',
      image: 11,
      selected: false,
      slug: 'livingRoom',
      id: 1,
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 3,
      selectedPackage: 'bliss',
    },
    {
      title: 'Nursery - 1',
      blockColor: '#BEEBE9',
      radioColor: '#79D1CD',
      image: 13,
      selected: false,
      id: 6,
      slug: 'nursery',
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 8,
      selectedPackage: 'bliss',
    },
    {
      title: 'Open Living - 1',
      blockColor: '#F4DADA',
      radioColor: '#D3B3B3',
      image: 12,
      selected: false,
      id: 8,
      slug: 'openLiving',
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 7,
      selectedPackage: 'bliss',
    },
    {
      title: 'Study Room - 1',
      blockColor: '#F6EEC7',
      radioColor: '#E7D682',
      selected: false,
      id: 3,
      slug: 'studyRoom',
      defaultQuantity: 1,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 4,
      selectedPackage: 'bliss',
    },
    {
      title: 'Bedroom - 1',
      blockColor: '#E5E5E5',
      radioColor: '#979898',
      selected: false,
      id: 2,
      image: 15,
      slug: 'bedRoom',
      defaultQuantity: 0,
      defaultSelection: 'bliss',
      quantity: 0,
      selectionItemId: 4,
    },
    {
      title: 'Home Office - 2',
      blockColor: '#D9DCF7',
      radioColor: '#7786B0',
      selected: false,
      id: 4,
      slug: 'homeOffice',
      defaultQuantity: 0,
      defaultSelection: 'bliss',
      quantity: 1,
      selectionItemId: 4,
    },
  ];

  const couponModalRef = useRef(null);
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
  const successOverlayRef = useRef(null);
  const closeModal = () => {
    successOverlayRef?.current?.close();
  };
  const handlePayment = async () => {
    try {
      setLoadingStatus(true);
      setToken(null);
      setPaymentError(null);
      const stripeTok = await stripe.createTokenWithCard(cardParams);
      const { tokenId } = stripeTok;
      setToken(tokenId);
      await makePayment(tokenId);
      setLoadingStatus(false);
      setPaymentError(null);

      // navigate to success page
      Keyboard.dismiss();
      successOverlayRef?.current?.open();
    } catch (error) {
      // console.log('an error occurred during pyament', error.message);
      setPaymentError('An error occurred during payment. Please try again');
    }
  };
  const openCouponModal = async () => {
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
      // console.log('error occurred ----', e.message);
      setCouponsFetchError(true);
    } finally {
      setCouponLoadingStatus(false);
    }
  };
  const totalAmount = 0;

  const sortedArray = sortByKey(userDesignSelections, 'title');
  const [couponValidationError, setCouponValidationError] = useState(false);
  const [couponValidated, setCouponValidated] = useState(false);
  const [currentlyAppliedCouponData, setCurrentlyActiveCoupon] = useState({});
  const validateCoupon = async (couponCode) => {
    if (couponCode.length) {
      setCouponLoadingStatus(true);
      setCouponValidationError(false);
      setCouponValidated(false);
      try {
        const [validationRes, validationErr] = await handle(
          fetcher({
            endPoint: checkoutRoutes.validateCoupon,
            method: 'POST',
            body: {
              data: {
                coupon: couponCode,
                package: 'bliss',
                isGiftCard: false,
              },
            },
          })
        );
        if (validationRes && !validationErr) {
          const { statusCode, data } = validationRes;
          if (statusCode <= 301) {
            setCouponValidated(true);
            setCurrentlyActiveCoupon(data);
          }
        } else {
          throw new Error();
        }
      } catch {
        setCouponValidationError(true);
      } finally {
        setCouponLoadingStatus(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={SIZES.padding * 3}
      onResponderGrant={dismissKeyboard}
      onStartShouldSetResponder={() => true}
    >
      <Block>
        <StatusBar barStyle="dark-content" />
        <Block flex={false} color={COLORS.white} padding={[0, SIZES.padding, 0, SIZES.padding]}>
          <Button center ghost style={{ borderRadius: SIZES.radius / 4 }} onPress={openCouponModal}>
            <Block row middle center>
              <LottieAnimations name="coupon" height={30} width={30} loop />
              <Block flex={false}>
                <Text mt1>Apply Coupon</Text>
              </Block>
            </Block>
          </Button>
        </Block>
        <Block flex={4} color={COLORS.white}>
          <Block
            row
            paddingVertical={SIZES.padding / 2}
            padding={[0, SIZES.padding]}
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
              <Text bold align="right">
                Package
              </Text>
            </Block>
          </Block>
          <Block flex={3} style={styles.cartHeader}>
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
                  lastChild={index === sortedArray.length - 1}
                />
              )}
            />
          </Block>
        </Block>
        <Block row flex={0.5} color={COLORS.white} padding={[SIZES.padding, SIZES.padding, 0, SIZES.padding]}>
          <Block row>
            <Text bold>Estimated Price</Text>
          </Block>
          <Block>
            <Text right>$ {totalAmount}</Text>
          </Block>
        </Block>
        {Object.keys(currentlyAppliedCouponData).length > 0 && (
          <Block color="rgb(241, 251, 244)" padding={SIZES.padding} flex={false}>
            <Text bold>
              Coupon Applied -{' '}
              <Text transform="uppercase">
                {currentlyAppliedCouponData?.coupon?.code} {'  '}
              </Text>
              <Button raw>
                <Icon name="close-circle-outline" />
              </Button>
            </Text>
          </Block>
        )}

        <Block flex={2} color={COLORS.white} padding={SIZES.padding} marginTop={SIZES.base}>
          <Text h3 mb3>
            Card Details
          </Text>
          <CardTextFieldScreen onValid={trackCardParams} />
          <Button
            color={COLORS.black}
            loading={loading}
            onPress={handlePayment}
            style={{ borderRadius: SIZES.radius / 4 }}
            marginVertical={SIZES.padding}
          >
            <Text center white>
              Pay ${totalAmount}
            </Text>
          </Button>
        </Block>

        <Modalize ref={couponModalRef} modalTopOffset={200}>
          {loadingCoupons && (
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
                onChangeText={(text) => setCurrentCouponCode(text)}
              />
              <Button color="black" style={styles.applyBtn} onPress={() => validateCoupon(currentCouponCode)}>
                <Text color={COLORS.white}>APPLY</Text>
              </Button>
            </Block>
            {couponValidated && (
              <Block row padding={SIZES.padding / 2} marginVertical={SIZES.padding} color="rgb(241, 251, 244)">
                <Block flex={1}>
                  <LottieAnimations name="coupon-validated" height={70} width={100} />
                </Block>
                <Block flex={3} middle>
                  <Text bold color={COLORS.green}>
                    Woohoo! Coupon Applied Successfully!
                  </Text>
                </Block>
              </Block>
            )}
            {couponValidationError && <LoginError errorText="Uh-oh! This Coupon is unavailable at this time." />}

            <ScrollView>
              {couponsList.map((item) => {
                return (
                  <CouponCard
                    title={item.title}
                    code={item.code}
                    description={item.description}
                    validateCoupon={validateCoupon}
                    key={`coupon-${item.title}`}
                  />
                );
              })}
            </ScrollView>
          </Block>
        </Modalize>
      </Block>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  applyBtn: {
    position: 'absolute',
    right: 0,
    bottom: 1,
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
  pageHeaderRight: {
    position: 'absolute',
    right: SIZES.padding,
  },
  cartHeader: {
    borderBottomWidth: 2,
    borderBottomColor: theme.COLORS.gray2,
  },
});

export default PaymentScreen;
