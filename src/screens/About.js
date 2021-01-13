import Avatar from '@components/Avatar';
import {Block, Carousel, Divider, Marketing, Text} from '@components/index';
import ProductsList from '@components/ProductsList';
import {theme} from '@constants/index';
import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const {SIZES, COLORS} = theme;

const About = ({route, navigation}) => {
  const {feedItem} = route.params;

  const [isLoading, setLoading] = useState(true);
  const [productList, setProductList] = useState([]);

  const getProductList = () =>
    fetch(
      `https://api.spacejoy.com/api/web/designs/public/slug/${feedItem.slug}`,
    )
      .then((response) => response.json())
      .then((json) => setProductList(json.data.assets))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <Block>
        <Carousel images={feedItem.cdnRender} />
      </Block>
      <Block row center padding={SIZES.padding}>
        <Block flex={3}>
          <Avatar
            uri="https://res.cloudinary.com/spacejoy/image/upload/c_thumb,g_face,fl_lossy,q_auto,f_auto,h_120,w_120/v1581506948/web/Customer%20Stories_Assets/Amber/Amber_profile_n4lpwa.jpg"
            user={{name: 'Amber Esperaza', city: 'Austin', state: 'Texas'}}
          />
        </Block>
        <Block row>
          <Block>
            <Text right>
              <Icon name="share-social-outline" size={20} />
            </Text>
          </Block>
          <Block>
            <Text right>
              <Icon name="ellipsis-vertical-outline" size={20} />
            </Text>
          </Block>
        </Block>
      </Block>

      <Block style={{paddingHorizontal: SIZES.padding}}>
        <Divider />
      </Block>

      <Block center style={styles.designData}>
        <Text h2 mb2>
          {feedItem.name}
        </Text>
        <Text small>
          For this glamorous living room with bursts of color, we chose some
          mid-century furniture pieces and added tons of textures to create that
          unique space...
        </Text>
      </Block>

      <Marketing />

      <Block padding={SIZES.padding}>
        <Block flex={2}>
          <Text h2>Products Used in this Design</Text>
        </Block>
        <Block>
          <Text small>25 Items</Text>
        </Block>
      </Block>

      <Block row center margin={SIZES.padding}>
        <ProductsList data={productList} isLoading={isLoading} />
      </Block>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  designData: {
    width: SIZES.width,
    padding: SIZES.padding,
  },
});
