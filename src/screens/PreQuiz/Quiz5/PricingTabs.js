import { Block, Text } from '@components/index';
import { theme } from '@constants/index';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { colorMap } from './fetchers';
import Indicator from './Indicator';

const { SIZES, COLORS } = theme;
const { width, height } = Dimensions.get('window');
const ITEM_SIZE = width * 0.8;
const SPACER_ITEM_WIDTH = (width - ITEM_SIZE) / 2;
const defaultData = [{}, {}, {}];

const PricingTabs = ({ data = [], onPress, currentActive, scrollX, onPressCb = () => {} }) => {
  const containerRef = React.useRef();

  const dataRender = data.length ? data : defaultData;

  const inputRange = dataRender.map((_, i) => i * (ITEM_SIZE - SPACER_ITEM_WIDTH));

  const bgColors = dataRender.map((_, i) => {
    if (i === 0) {
      return scrollX?.interpolate({
        inputRange,
        outputRange: [colorMap.delight.mild, COLORS.white, COLORS.white],
      });
    } else if (i === 1) {
      return scrollX?.interpolate({
        inputRange,
        outputRange: [COLORS.white, colorMap.bliss.mild, COLORS.white],
      });
    } else {
      return scrollX?.interpolate({
        inputRange,
        outputRange: [COLORS.white, COLORS.white, colorMap.euphoria.mild],
      });
    }
  });
  const [mData, setMData] = useState({});
  const [measureMents, setMeasurements] = useState([]);

  useEffect(() => {
    if (Object.keys(mData).length === data.length) {
      const m = [];
      const sortedArray = [...Object.keys(mData)].sort((a, b) => a - b);
      sortedArray.forEach((indexVal) => m.push(mData[indexVal]));
      setMeasurements(m);
    }
  }, [mData]);
  const layoutCb = (event, index) => {
    const { x, y, width: tabWidth, height: tabHeight } = event.nativeEvent.layout;
    const obj = {};
    obj[index] = { x, y, width: tabWidth, height: tabHeight };
    setMData((state) => ({ ...state, ...obj }));
  };
  return (
    <Block row middle center ref={containerRef}>
      {data.map((item, index) => {
        const tabStyles = [styles.tabStyles, index !== data?.length - 1 && styles.spaceRight];
        return (
          <Block style={tabStyles} flex={false} key={`pricing-card-${index}`} onLayout={(e) => layoutCb(e, index)}>
            <TouchableOpacity style={styles.btnStyles} onPress={() => onPress(index)}>
              <Block animated center middle style={styles.contentStyles} color={bgColors[index]}>
                <Text size={20} bold capitalize mb1 color={colorMap[item.slug].dark}>
                  {item?.slug}
                </Text>
                <Text size={12}>Price</Text>
                <Text small strike>
                  ${item?.price?.value}.00
                </Text>
                <Text bold mt1 size={20}>
                  ${item?.salePrice.value}.00
                </Text>
              </Block>
            </TouchableOpacity>
          </Block>
        );
      })}
      {(measureMents?.length && scrollX) !== 0 && (
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
    height: SIZES.base * 14,
    width: SIZES.base * 14,
    padding: 4,
    borderColor: COLORS.gray2,
    borderWidth: 1,
    borderRadius: SIZES.radius,
  },
  contentStyles: {
    borderRadius: SIZES.radius / 1.5,
    padding: SIZES.padding / 2,
  },
  spaceRight: {
    marginRight: SIZES.padding,
  },
  btnStyles: {
    height: '100%',
  },
});
export default PricingTabs;
