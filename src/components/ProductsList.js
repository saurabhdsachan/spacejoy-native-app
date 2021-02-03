import {theme} from '@constants/index';
import React, {useRef} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Block from './Block';
import Button from './Button';
import Divider from './Divider';
import Text from './Text';

const {SIZES, COLORS} = theme;

const Item = ({data: {asset}}) => (
  <Block center row margin={[SIZES.padding / 2, 0, SIZES.padding / 2, 0]}>
    <Block flex={1}>
      {asset.cdn && asset.cdn ? (
        <Block center middle>
          <Image
            source={{
              uri: `https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto,f_auto,w_200/${asset.cdn}`,
            }}
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
            }}
          />
        </Block>
      ) : (
        <Text>No Image</Text>
      )}
    </Block>
    <Block flex={2}>
      <Text caption mt2 color="gray">
        {asset.retailer}
      </Text>
      <Text body mb1>
        {asset.name}
      </Text>
      <Text small mb2>
        ${asset.price}.00
      </Text>
    </Block>
  </Block>
);

const ProductModal = React.forwardRef(({data}, ref) => {
  return (
    <Portal>
      <Modalize
        modalTopOffset={SIZES.safe}
        ref={ref}
        flatListProps={{
          data: data,
          contentContainerStyle: {
            padding: SIZES.padding,
          },
          ListHeaderComponent: (
            <Block padding={[SIZES.base, 0, SIZES.padding, 0]} center>
              <Text h2 align="center">
                List of Products used ({data?.length})
              </Text>
              <Divider style={styles.divider} />
            </Block>
          ),
          renderItem: ({item}) => {
            return <Item data={item} key={`product-item-${item.asset.id}`} />;
          },
          keyExtractor: (item) => item?._id,
        }}
      />
    </Portal>
  );
});

const ProductsList = ({data}) => {
  const ref = useRef(null);
  const onPress = () => ref?.current?.open();
  return (
    <>
      <Button dashed style={{borderRadius: SIZES.radius / 4}} onPress={onPress}>
        <Text bold align="center">
          View Products used in this design
        </Text>
      </Button>
      <ProductModal data={data} ref={ref} />
    </>
  );
};

const styles = StyleSheet.create({
  divider: {
    paddingTop: SIZES.padding,
    width: 50,
  },
});

export default ProductsList;
