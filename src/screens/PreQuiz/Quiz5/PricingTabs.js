import React, {useEffect, useState, useRef} from 'react';
import {Block, Text, Button} from '@components/index';
import {StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {theme} from '@constants/index';
import {colorMap} from './fetchers';
import Indicator from './Indicator';

const {SIZES, COLORS} = theme;
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;

const PricingTabs = ({data = [], onPress, currentActive, scrollX}) => {
  const containerRef = React.useRef();

  const defaultData = [{}, {}, {}];
  const dataRender = data.length ? data : defaultData;

  const inputRange = dataRender.map(
    (_, i) => i * (ITEM_SIZE - SPACER_ITEM_WIDTH),
  );

  const bgColors = dataRender.map((_, i) => {
    if (i === 0) {
      return scrollX.interpolate({
        inputRange,
        outputRange: [colorMap.delight.mild, 'white', 'white'],
      });
    } else if (i === 1) {
      return scrollX.interpolate({
        inputRange,
        outputRange: ['white', colorMap.bliss.mild, 'white'],
      });
    } else {
      return scrollX.interpolate({
        inputRange,
        outputRange: ['white', 'white', colorMap.euphoria.mild],
      });
    }
  });
  const [mData, setMData] = useState({});
  const [measureMents, setMeasurements] = useState([]);
  console.log(measureMents);
  useEffect(() => {
    if (Object.keys(mData).length === data.length) {
      const sortedArray = [...Object.keys(mData)].sort((a, b) => a - b);
      const m = [];
      sortedArray.forEach((indexVal) => m.push(mData[indexVal]));
      setMeasurements(m);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mData]);
  const layoutCb = (event, index) => {
    console.log('method called');
    const {x, y, width: tabWidth, height: tabHeight} = event.nativeEvent.layout;
    const obj = {};
    obj[index] = {x, y, width: tabWidth, height: tabHeight};
    setMData((state) => ({...state, ...obj}));
  };
  return (
    <Block row middle center ref={containerRef}>
      {data.map((item, index) => {
        const tabStyles =
          data.length && index !== data.length - 1
            ? [styles.tabStyles, styles.spaceRight]
            : [styles.tabStyles];
        return (
          <Block
            style={tabStyles}
            flex={false}
            onLayout={(e) => layoutCb(e, index)}>
            <TouchableOpacity
              style={styles.btnStyles}
              onPress={() => onPress(index)}>
              <Block
                animated
                center
                style={styles.contentStyles}
                color={bgColors[index]}>
                <Text
                  h3
                  header
                  color={colorMap[item.slug].dark}
                  bold
                  style={{textTransform: 'capitalize', lineHeight: 20}}>
                  {item?.slug}
                </Text>
                <Text size={10} light>
                  Price
                </Text>
                <Text
                  small
                  light
                  linethrough
                  style={styles.tabBodyText}
                  color="#6D7278">
                  ${item?.price?.value}
                </Text>
                <Text bold size={20}>
                  ${item?.salePrice.value}
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        );
      })}
      {measureMents.length > 0 && (
        <Indicator
          measureMents={measureMents}
          scrollX={scrollX}
          data={data}
          size={ITEM_SIZE}
          spacerWidth={SPACER_ITEM_WIDTH}
        />
      )}
    </Block>
  );
};

const styles = StyleSheet.create({
  tabStyles: {
    height: 110,
    width: 110,
    backgroundColor: 'white',
    paddingVertical: SIZES.padding / 5,
    paddingHorizontal: SIZES.padding / 5,
    borderColor: '#dedede',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: SIZES.radius,
  },
  contentStyles: {
    borderRadius: SIZES.radius / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding / 2,
  },
  spaceRight: {
    marginRight: 15,
  },
  btnStyles: {
    height: '100%',
    borderRadius: SIZES.radius / 2,
  },
});
export default PricingTabs;
